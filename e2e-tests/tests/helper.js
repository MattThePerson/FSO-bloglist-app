
const sampleBlog = {
  title: "How to use Playwright",
  author: "Mr Beans",
  url: "https://website.com/playwright",
}

const handleLogin = async (page, username, password) => {
  await page.goto("/login")
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "login" }).click()
}

const handlePostBlog = async (page, title, author, url) => {
  await page.goto("/create")
  await page.getByLabel("Title").fill(title)
  await page.getByLabel("Author").fill(author)
  await page.getByLabel("URL").fill(url)
  await page.getByRole("button", { name: "create" }).click()
  await page.waitForURL("/")
}

const handleLogout = async (page) => {
  await page.getByRole("button", { name: "LOGOUT" }).click()
}

module.exports = {
  handleLogin,
  handleLogout,
  handlePostBlog,
  sampleBlog,
}

