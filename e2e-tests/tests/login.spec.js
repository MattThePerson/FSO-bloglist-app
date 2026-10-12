const { test, expect, beforeEach, describe } = require("@playwright/test")
const helper = require("./helper")

describe("Blog app", () => {

  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset")
    await request.post("/api/users", {
      data: { name: "Some Guy", username: "root", password: "salainen" }
    })
    await request.post("/api/users", {
      data: { name: "Some Gal", username: "user1", password: "password" }
    })
    await page.goto("/")
  })

  test("Login form is shown", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByPlaceholder("username")).toBeVisible()
    await expect(page.getByPlaceholder("password")).toBeVisible()
    await expect(page.getByRole("button", { name: "login" })).toBeVisible()
  })

  describe("Login", () => {

    test("succeeds with correct credentials", async ({ page }) => {
      await helper.handleLogin(page, "root", "salainen")
      // logged in ui visible
      await expect(page.getByRole("button", { name: "LOGOUT" })).toBeVisible()
      await expect(page.getByRole("button", { name: "login" })).not.toBeVisible()
      // login form not visible
      await expect(page.getByPlaceholder("username")).not.toBeVisible()
      await expect(page.getByPlaceholder("password")).not.toBeVisible()
    })

    test("fails with incorrect credentials", async ({ page }) => {
      await helper.handleLogin(page, "root1", "password")
      // logged in ui not visible
      await expect(page.getByRole("button", { name: "LOGOUT" })).not.toBeVisible()
      await expect(page.getByRole("button", { name: "login" })).toBeVisible()
      // login form visible
      await expect(page.getByPlaceholder("username")).toBeVisible()
      await expect(page.getByPlaceholder("password")).toBeVisible()
    })

  }) // describe: Login

  describe("When logged in", () => {

    beforeEach(async ({ page }) => {
      await helper.handleLogin(page, "root", "salainen")
      await page.waitForURL("/")
    })

    test("a new blog can be created", async ({ page }) => {
      const { title, author, url } = helper.sampleBlog
      await helper.handlePostBlog(page, title, author, url)
      // blog visible
      await expect(page.getByText(title)).toBeVisible()
      await expect(page.getByText(author)).toBeVisible()
    })

    test("blog can be liked", async ({ page }) => {
      const { title, author, url } = helper.sampleBlog
      await helper.handlePostBlog(page, title, author, url)
      // click on first link
      await page.locator(".blogs-list").getByRole("link").first().click()
      await page.getByRole("button", { name: "like" }).click()
      await expect(page.getByLabel("likes")).toHaveText("1 likes")
    })

    test("blog can be deleted", async ({ page }) => {
      page.on('dialog', async dialog => await dialog.accept()) // confirm window.confirm
      const { title, author, url } = helper.sampleBlog
      await helper.handlePostBlog(page, title, author, url)
      // blog is visible
      await expect(page.getByText(title)).toBeVisible()
      await expect(page.getByText(author)).toBeVisible()
      // click on first link
      await page.locator(".blogs-list").getByRole("link").first().click()
      // delete
      await page.getByRole("button", { name: "delete" }).click()
      await page.waitForURL("/")
      // blog is not visible
      await expect(page.getByText(title)).not.toBeVisible()
      await expect(page.getByText(author)).not.toBeVisible()
    })

    test("delete button only visible to creator", async ({ page }) => {
      const { title, author, url } = helper.sampleBlog
      await helper.handlePostBlog(page, title, author, url)
      // click on first link
      await page.locator(".blogs-list").getByRole("link").first().click()
      await expect(page.getByRole("button", { name: "delete" })).toBeVisible()
      // login with diff creds
      await helper.handleLogout(page)
      await helper.handleLogin(page, "user1", "password")
      // click on first link
      await page.locator(".blogs-list").getByRole("link").first().click()
      await expect(page.getByRole("button", { name: "delete" })).not.toBeVisible()
    })

    /* test disabled (ux change)
    test("blogs sorted by likes", async ({ page }) => {
      // 1. add 3 blogs
      // await page.pause()
      const blogs = [
        { title: "blog 1", author: "mr. smith", url: "https://blog.com/mr-smith" },
        { title: "blog 2", author: "mrs. smith", url: "https://blog.com/mrs-smith" },
        { title: "blog 3", author: "ms. smith", url: "https://blog.com/ms-smith" },
      ]
      // add blogs
      for (let blog of blogs) {
        await helper.handlepostblog(page, blog.title, blog.author, blog.url)
      }
      // expand all blogs
      while (await page.getbyrole("button", { name: "view" }).count() > 0) {
        await page.getbyrole("button", { name: "view" }).first().click()
      }
      // 2. like blogs differing amounts
      // await page.pause()
      for (let i = 0; i < 12; i++) {
        const likebuttons = page.getbyrole("button", { name: "like" })
        const count = await likebuttons.count()
        if (count === 0) break // nothing likeable, bail out
        const nth = math.floor(math.random() * count)
        await likebuttons.nth(nth).click()
        await page.waitfortimeout(100)
      }
      // 3. reload page and expand blogs
      // await page.pause()
      await page.goto("/")
      await page.waitforloadstate('networkidle')
      while (await page.getbyrole("button", { name: "view" }).count() > 0) {
        await page.getbyrole("button", { name: "view" }).first().click()
      }
      await expect(page.getByRole("button", { name: "view" })).toHaveCount(0)
      await expect(page.getByLabel("likes").first()).toBeVisible()
      // 4. enure likes in order
      const likesElements = await page.getByLabel("likes").all()
      const likesText = await Promise.all(likesElements.map(el => el.textContent()))
      const likes = likesText.map(el => Number(el))
      const likesSorted = [...likes].sort((a, b) => b - a)
      // console.log(likes)
      // await page.pause()
      expect(likes).toEqual(likesSorted)
    })
    */

  }) // Describe: When logged int
}) // Describe: Blog app

