import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/drizzle/schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const client = postgres(process.env.DATABASE_URL)
export const db = drizzle(client, { schema })

export type Database = typeof db

// Helper functions for common operations
export async function getTeamById(id: string) {
  return db.query.teams.findFirst({
    where: (teams, { eq }) => eq(teams.id, id),
    with: {
      members: {
        with: {
          user: true,
        },
      },
      projects: true,
    },
  })
}

export async function getMeetingById(id: string) {
  return db.query.meetings.findFirst({
    where: (meetings, { eq }) => eq(meetings.id, id),
    with: {
      project: {
        with: {
          team: true,
        },
      },
      participants: {
        with: {
          user: true,
        },
      },
      notes: {
        orderBy: (notes, { desc }) => [desc(notes.createdAt)],
        limit: 1,
      },
      actionItems: true,
    },
  })
}

export async function getUserTeams(userId: string) {
  return db.query.teamMembers.findMany({
    where: (teamMembers, { eq }) => eq(teamMembers.userId, userId),
    with: {
      team: {
        with: {
          projects: {
            with: {
              meetings: {
                orderBy: (meetings, { desc }) => [desc(meetings.startTime)],
                limit: 5,
              },
            },
          },
        },
      },
    },
  })
}

export async function getUpcomingMeetings(userId: string, limit = 10) {
  return db.query.meetingParticipants.findMany({
    where: (participants, { eq, and, gt }) =>
      and(
        eq(participants.userId, userId),
        gt(participants.meeting.startTime, new Date())
      ),
    with: {
      meeting: {
        with: {
          project: {
            with: {
              team: true,
            },
          },
          participants: {
            with: {
              user: true,
            },
          },
        },
      },
    },
    orderBy: (participants, { asc }) => [asc(participants.meeting.startTime)],
    limit,
  })
}

export async function getActionItemsByUser(userId: string, status?: string) {
  const whereClause = status
    ? (actionItems: typeof schema.actionItems, { eq, and }) =>
        and(
          eq(actionItems.assigneeId, userId),
          eq(actionItems.status, status)
        )
    : (actionItems: typeof schema.actionItems, { eq }) =>
        eq(actionItems.assigneeId, userId)

  return db.query.actionItems.findMany({
    where: whereClause,
    with: {
      meeting: {
        with: {
          project: {
            with: {
              team: true,
            },
          },
        },
      },
    },
    orderBy: (actionItems, { asc }) => [asc(actionItems.dueDate)],
  })
}

// Search functions
export async function searchMeetings(query: string, userId: string) {
  return db.query.meetings.findMany({
    where: (meetings, { or, like, and, eq }) =>
      and(
        or(
          like(meetings.title, `%${query}%`),
          like(meetings.description, `%${query}%`)
        ),
        eq(meetings.participants.userId, userId)
      ),
    with: {
      project: {
        with: {
          team: true,
        },
      },
      participants: {
        with: {
          user: true,
        },
      },
    },
    limit: 20,
  })
}

export async function searchNotes(query: string, userId: string) {
  return db.query.notes.findMany({
    where: (notes, { or, like, and, eq }) =>
      and(
        or(
          like(notes.content, `%${query}%`),
          like(notes.summary, `%${query}%`)
        ),
        eq(notes.authorId, userId)
      ),
    with: {
      meeting: {
        with: {
          project: {
            with: {
              team: true,
            },
          },
        },
      },
    },
    orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    limit: 20,
  })
}

// Statistics functions
export async function getUserMeetingStats(userId: string) {
  const [totalMeetings, upcomingMeetings, completedMeetings] = await Promise.all([
    db.$count(schema.meetingParticipants, (participants) =>
      participants.where(eq(participants.userId, userId))
    ),
    db.$count(schema.meetingParticipants, (participants) =>
      participants.where(
        and(
          eq(participants.userId, userId),
          gt(participants.meeting.startTime, new Date())
        )
      )
    ),
    db.$count(schema.meetingParticipants, (participants) =>
      participants.where(
        and(
          eq(participants.userId, userId),
          eq(participants.meeting.status, 'completed')
        )
      )
    ),
  ])

  return {
    totalMeetings,
    upcomingMeetings,
    completedMeetings,
    attendanceRate: totalMeetings > 0 ? (completedMeetings / totalMeetings) * 100 : 0,
  }
}

export async function getTeamStats(teamId: string) {
  const [totalMeetings, activeProjects, teamMembers] = await Promise.all([
    db.$count(schema.meetings, (meetings) =>
      meetings.where(
        eq(meetings.project.teamId, teamId)
      )
    ),
    db.$count(schema.projects, (projects) =>
      projects.where(
        and(
          eq(projects.teamId, teamId),
          eq(projects.status, 'active')
        )
      )
    ),
    db.$count(schema.teamMembers, (members) =>
      members.where(eq(members.teamId, teamId))
    ),
  ])

  return {
    totalMeetings,
    activeProjects,
    teamMembers,
  }
}

// Import drizzle operators
import { eq, and, gt, like, or } from 'drizzle-orm'