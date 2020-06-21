export const getAllEntries = async () => {
	const getStoryblokData = new Promise((resolve, reject) => {
		storyblok.getAll(
			{
				version: 'draft'
			},
			(data, err) => {
				const { stories } = data;
				if (stories) {
					resolve(stories);
				} else {
					reject('Sorry we couldnt fetch any data', err);
				}
			}
		);
	});
	const storyblokData = await getStoryblokData;
	return storyblokData;
};

export const getEntryBySlug = async (slug) => {
	const getStoryblokData = new Promise((resolve, reject) => {
		storyblok.get(`cdn/stories/posts/${slug}`, (data, err) => {
			if (data) {
				resolve(data);
			} else {
				reject('Sorry we couldnt fetch any data', err);
			}
		});
	});
	const storyblokData = await getStoryblokData;
	return storyblokData;
};
