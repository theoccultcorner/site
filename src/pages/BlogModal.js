const BlogModal = ({ open, onClose, userId, selectedBlog, onBlogSave, displayName }) => {
  const [title, setTitle] = useState(selectedBlog?.title || '');
  const [content, setContent] = useState(selectedBlog?.content || '');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and Content are required.');
      return;
    }

    setLoading(true);
    let imageUrl = selectedBlog?.imageUrl || null;

    // Handle image upload
    if (imageFile) {
      const storage = getStorage();
      const imageRef = storageRef(storage, `blogImages/${imageFile.name}`);
      try {
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const blogData = {
      title: title.trim(),
      content: content.trim(),
      imageUrl,
      date: new Date().toISOString(),
      author: displayName || 'Anonymous',
    };

    const db = getDatabase();
    try {
      if (selectedBlog?.id) {
        await update(ref(db, `blogPosts/${userId}/${selectedBlog.id}`), blogData);
      } else {
        await push(ref(db, `blogPosts/${userId}`), blogData);
      }
      onBlogSave();
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '90%', maxWidth: 500, margin: '50px auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom>{selectedBlog ? 'Edit Blog' : 'Create Blog'}</Typography>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" component="span" sx={{ marginBottom: '20px' }}>
            Upload Image
          </Button>
        </label>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Modal>
  );
};

export default BlogModal;
