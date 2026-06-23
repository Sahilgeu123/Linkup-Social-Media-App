import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // adjust path to your config

async function fetchComments(postId: string) {
  const commentsRef = collection(db, "posts", postId, "comments");
  const snapshot = await getDocs(commentsRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default fetchComments;