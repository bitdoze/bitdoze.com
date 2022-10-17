export const SITE = {
	name: 'Bit Doze',

	origin: 'https://www.bitdoze.com',
	basePathname: '/',

	title: 'Bit Doze Website',
	description: 'An Website about Linux, blogging, CMS and other internet news..',

	googleAnalyticsId: false, // or "G-XXXXXXXXXX",
	googleSiteVerificationId: 'jyQEUqY6oYZKY6ZhkHatU7g4vVBBSb7z3Zw5bA',
};

export const BLOG = {
	disabled: false,
	postsPerPage: 9,

	blog: {
		disabled: false,
		pathname: 'blog', // blog main path, you can change this to "articles" (/articles)
	},

	post: {
		disabled: false,
		pathname: '', // empty for /some-post, value for /pathname/some-post
	},

	category: {
		disabled: false,
		pathname: '', // set empty to change from /category/some-category to /some-category
	},

	tag: {
		disabled: false,
		pathname: 'tag', // set empty to change from /tag/some-tag to /some-tag
	},
};
