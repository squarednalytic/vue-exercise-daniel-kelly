import { userSchema } from '../../validation';

export default async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    // Proceed with validated data
    res.status(200).json({ success: true, data: validatedData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.errors });
  }
};
