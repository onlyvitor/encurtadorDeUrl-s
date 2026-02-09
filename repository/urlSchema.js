import zod from 'zod';

const validationSchemaUrl = zod.object({
  originalUrl: zod.string().url({ message: 'Invalid URL format' }),
});

export default validationSchemaUrl;