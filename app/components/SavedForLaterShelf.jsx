"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { db } from "../firebase/config";
import { DBBookCard } from "./DBBookCard";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import Link from "next/link";

const SavedForLaterShelf = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  let router = useRouter();
  const [books, setBooks] = useState([]);

  const getUsersSaved = async (user) => {
    const docRef = doc(db, "userData", user.uid);
    try {
      const responseWithSingleUser = await getDoc(docRef);
      const singleUserData = responseWithSingleUser.data();
      setBooks(singleUserData.savedBooks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {

      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        getUsersSaved(currentUser);
      }
    });
  }, []);

  const removeBook = async (book, id) => {
    // try and do with state
    const filteredBooks = books.filter((book) => {
      return book.bookID !== id;
    });
    setBooks(filteredBooks);
    const docRef = doc(db, "userData", user.uid);
    await updateDoc(docRef, {
      savedBooks: arrayRemove(book),
    });
  };

  return (
    <section className="p-4 bg-white mt-5 rounded-2xl text-slate-800 text-center">
      <Link className="text-xl font-bold" href="/saved-for-later">Saved For Later</Link>
      <div className="flex flex-row flex-wrap w-full gap-2 justify-start items-center">
        {books.map((book) => {
          return (
            <DBBookCard key={book.bookID} book={book} removeBook={removeBook} />
          );
        })}
      </div>
    </section>
  );
};

export default SavedForLaterShelf;
