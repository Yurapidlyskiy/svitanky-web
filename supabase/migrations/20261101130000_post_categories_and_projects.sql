-- Posts gain two categories, camps and projects. A project is a post with a
-- different card: a fundraising status, a goal and the amount raised so far.
-- These columns are filled for projects and empty for everything else.

alter table public.posts
  drop constraint posts_category_check,
  add constraint posts_category_check
    check (category in ('news', 'announcements', 'camps', 'projects', 'reports')),
  add column project_status text
    constraint posts_project_status_check
    check (project_status in ('active', 'planned', 'completed')),
  add column goal_amount integer
    constraint posts_goal_amount_check
    check (goal_amount between 1 and 1000000000),
  add column raised_amount integer
    constraint posts_raised_amount_check
    check (raised_amount between 0 and 1000000000),
  add constraint posts_project_fields_check
    check (
      case
        when category = 'projects' then
          project_status is not null and goal_amount is not null and raised_amount is not null
        else
          project_status is null and goal_amount is null and raised_amount is null
      end
    );
