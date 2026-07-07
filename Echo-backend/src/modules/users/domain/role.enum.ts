export enum UserRole {
  ADMIN = "admin", //Users who have high privileges to manage projects and tasks but do not own the overall workspace settings.
  MEMBER = "member", //Regular team members who work on projects, view tasks, and update task statuses.
  OWNER = "owner", //creator/administrator of a workspace/tenant who has full control (billing, projects, members).
}
