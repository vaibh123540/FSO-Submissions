const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
            username: 'test_user',
            name: 'test',
            password: 'test',
        }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'test_user', 'test')
        await expect(page.getByText('test logged in')).toBeVisible()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'test_user', 'wrong')
        await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'test_user', 'test')
    })
    
    test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
        const defaultView = await page.locator('.defaultView')
        await expect(defaultView).toBeVisible()
        await expect(defaultView.getByText('Test Blog')).toBeVisible()
        await expect(defaultView.getByText('Test Author')).toBeVisible()
    })
  })

  describe('When a blog exists', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test_user', 'test')
      await createBlog(page, 'Test Blog', 'Test Author', 'http://testblog.com')
    })

    test('it can be liked', async ({ page }) => {
        const defaultView = await page.locator('.defaultView')
        await expect(defaultView).toBeVisible()
        await defaultView.getByRole('button', { name: 'view' }).click()
        const detailedView = await page.locator('.detailedView')
        await expect(detailedView).toBeVisible()
        await detailedView.getByRole('button', { name: 'like' }).click()
        await expect(detailedView.getByText('likes 1')).toBeVisible()
    })

    // test.only('it can be removed by the creator', async ({ page }) => {
    //     const defaultView = await page.locator('.defaultView')
    //     await expect(defaultView).toBeVisible()
    //     await defaultView.getByRole('button', { name: 'view' }).click()
    //     const detailedView = await page.locator('.detailedView')
    //     await expect(detailedView).toBeVisible()

    //     const removeBlog = await detailedView.locator('.removeBlog')

    //     await expect(removeBlog).toBeVisible()
    //     page.on('dialog', dialog => dialog.accept());
    //     await removeBlog.getByRole('button', { name: 'remove' }).click()
    //     await expect(page.getByText('Test Blog')).not.toBeVisible()
    // })

    test('it cannot be removed by another user', async ({ page, request }) => {
        await request.post('/api/users', {
            data: {
                username: 'another_user',
                name: 'another',
                password: 'another',
            }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'another_user', 'another')

        const defaultView = await page.locator('.defaultView')
        await expect(defaultView).toBeVisible()

        await defaultView.getByRole('button', { name: 'view' }).click()
        const detailedView = await page.locator('.detailedView')
        await expect(detailedView).toBeVisible()

        const removeBlog = await detailedView.locator('.removeBlog')
        await expect(removeBlog).not.toBeVisible()
    })
  })

// test('blogs are ordered by likes', async ({ page }) => {
//     await loginWith(page, 'test_user', 'test');
//     await createBlog(page, 'First Blog', 'Author One', 'http://firstblog.com');
//     await createBlog(page, 'Second Blog', 'Author Two', 'http://secondblog.com');

//     const firstBlog = page.locator('.defaultView').first();
//     await firstBlog.getByRole('button', { name: 'view' }).click();
//     const firstBlogDetailed = page.locator('.detailedView').first();
//     await firstBlogDetailed.getByRole('button', { name: 'like' }).click();
//     await firstBlogDetailed.getByRole('button', { name: 'like' }).click();

//     const secondBlog = page.locator('.defaultView').nth(1);
//     await secondBlog.getByRole('button', { name: 'view' }).click();
//     const secondBlogDetailed = page.locator('.detailedView').nth(1);
//     await secondBlogDetailed.getByRole('button', { name: 'like' }).click();

//     await page.waitForTimeout(500);

//     const blogItems = page.locator('.blogList .defaultView');
//     const blogCount = await blogItems.count();

//     expect(blogCount).toBe(2);

//     const firstBlogText = await blogItems.nth(0).textContent();
//     const secondBlogText = await blogItems.nth(1).textContent();

//     expect(firstBlogText).toContain('likes 2');
//     expect(secondBlogText).toContain('likes 1');
//   });
})