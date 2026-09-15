import React, { useEffect, useState } from "react";
import { ArrowForwardRounded, AutoStoriesRounded, CloseRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = ref(getDatabase(), "blogPosts");
    return onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const posts = data
        ? Object.entries(data)
            .map(([id, value]) => ({ id, ...value }))
            .filter((post) => post.title && post.content)
            .reverse()
        : [];
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  const formatDate = (date) => {
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? "" : parsed.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <>
      <Box component="header" sx={{ py: { xs: 9, md: 13 }, borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Typography className="eyebrow" component="p">The Gnostic Journal</Typography>
          <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: "3.6rem", md: "5.8rem" } }}>Ideas for the<br /><Box component="span" sx={{ color: "primary.main" }}>inner journey.</Box></Typography>
          <Typography color="text.secondary" sx={{ mt: 3, maxWidth: 610, fontSize: "1.08rem", lineHeight: 1.8 }}>
            Essays, reflections, and teachings from members of The Gnostic Union community.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 }, minHeight: 430 }}>
        {loading ? (
          <Box sx={{ minHeight: 260, display: "grid", placeItems: "center" }}><CircularProgress color="primary" /></Box>
        ) : blogPosts.length === 0 ? (
          <Box className="glass-panel" sx={{ maxWidth: 680, mx: "auto", p: { xs: 4, md: 7 }, textAlign: "center", borderRadius: 4 }}>
            <AutoStoriesRounded color="primary" sx={{ fontSize: 44 }} />
            <Typography variant="h3" sx={{ mt: 2 }}>The first page is waiting</Typography>
            <Typography color="text.secondary" sx={{ mt: 1.5 }}>Community essays and reflections will appear here as they are published.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {blogPosts.map((post) => (
              <Grid item xs={12} sm={6} lg={4} key={post.id}>
                <Card className="glass-panel" sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", transition: "transform .25s ease", "&:hover": { transform: "translateY(-6px)" } }}>
                  {post.imageUrl && !post.imageUrl.includes("via.placeholder") ? (
                    <CardMedia component="img" height="220" image={post.imageUrl} alt="" sx={{ objectFit: "cover" }} />
                  ) : (
                    <Box sx={{ height: 180, display: "grid", placeItems: "center", color: "primary.main", background: "radial-gradient(circle, rgba(215,181,109,.15), rgba(121,201,190,.05))" }}><AutoStoriesRounded sx={{ fontSize: 48 }} /></Box>
                  )}
                  <CardContent sx={{ p: 3.5, flex: 1, display: "flex", flexDirection: "column" }}>
                    <Typography variant="overline" color="primary.main">{formatDate(post.date)}</Typography>
                    <Typography variant="h4" sx={{ mt: 0.5 }}>{post.title}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>By {post.authorDisplayName || "The Gnostic Union"}</Typography>
                    <Button onClick={() => setSelectedPost(post)} endIcon={<ArrowForwardRounded />} sx={{ mt: "auto", pt: 3, alignSelf: "flex-start" }}>Read article</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={Boolean(selectedPost)} onClose={() => setSelectedPost(null)} fullWidth maxWidth="md" PaperProps={{ sx: { border: "1px solid", borderColor: "divider", borderRadius: 4 } }}>
        {selectedPost && (
          <DialogContent sx={{ p: { xs: 3, sm: 6 }, position: "relative" }}>
            <IconButton aria-label="Close article" onClick={() => setSelectedPost(null)} sx={{ position: "absolute", top: 14, right: 14 }}><CloseRounded /></IconButton>
            <Typography variant="overline" color="primary.main">{formatDate(selectedPost.date)}</Typography>
            <Typography variant="h2" sx={{ mt: 1, pr: 5, fontSize: { xs: "2.6rem", md: "4rem" } }}>{selectedPost.title}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>By {selectedPost.authorDisplayName || "The Gnostic Union"}</Typography>
            {selectedPost.imageUrl && !selectedPost.imageUrl.includes("via.placeholder") && <Box component="img" src={selectedPost.imageUrl} alt="" sx={{ width: "100%", maxHeight: 440, objectFit: "cover", borderRadius: 3, my: 4 }} />}
            <Stack spacing={2} sx={{ mt: 4 }}>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.9, whiteSpace: "pre-wrap", fontSize: "1.04rem" }}>{selectedPost.content}</Typography>
            </Stack>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default Blogs;
