import type { TeamMember } from "@/store/slices/teamSlice"

export async function fetchTeamData(): Promise<TeamMember[]> {
  try {
    const response = await fetch("https://randomuser.me/api/?results=6")
    const data = await response.json()

    return data.results.map((user: any, index: number) => ({
      id: `user-${index + 1}`,
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      avatar: user.picture.large,
      status: ["Working", "Break", "Meeting", "Offline"][Math.floor(Math.random() * 4)],
      activeTasks: Math.floor(Math.random() * 5) + 1,
      role: index === 0 ? "lead" : "member",
    }))
  } catch (error) {
    console.error("Error fetching team data:", error)
    throw error
  }
}
