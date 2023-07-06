import user from "../modal.js";
export const addtask = async (req, res) => {
  try {
    const { url } = req.body;
    const response = await fetch(url);
    const text = await response.text();

    // Count the words in the fetched content
    const words = text.split(/\s+/);
    const wordCount = words.length;
    // const wordCount = 33
    const newtask=new user({
        url,
        wordcount:wordCount,
        isFavorite:false
    })
    const savedUser = await newtask.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getalltask = async (req, res) => {
    try {
        const tasks = await user.find({})
        res.status(200).json({ tasks })
      }
      catch (error) {
        res.status(500).json({ msg: error })
      }
};
export const deletetask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID })
        if (!task) {
            res.status(500).json({ msg: error })
        }
        res.status(200).json({ task })
      }
      catch (error) {
        res.status(500).json({ msg: error })
      }
};
export const addfavorite = async (req, res) => {
    const { id } = req.params;

    try {
      const updatedInsight = await Insight.findByIdAndUpdate(
        id,
        { isFavorite: true },
        { new: true }
      );
      res.json(updatedInsight);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update insight' });
    }
};
