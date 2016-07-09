defmodule Server.UserView do
  use Server.Web, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, Server.UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, Server.UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      password: user.password}
  end
end
