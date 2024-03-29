"use client";

import DiscussionItem from "@/components/DiscussionItem"; // Import the DiscussionItem component

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormData } from "@/types/discussion";
import { ToastContainer } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

const inputClass =
  "w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black";

const DiscussionPage = () => {
  const router = useRouter();

  const [post, setPost] = useState({ posts: [] });
  const getPost = async () => {
    const session = await getSession();
    console.log(session);
    if (!session) {
      router.push("/sign-in");
    } else {
      const { data } = await axios.get(`api/discussion`);
      setPost(data);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("api/discussion", formData);
      if (response.status === 200) {
        successNotification("Discussion has been submitted!");
        setFormData({
          title: "",
          content: "",
        });
        getPost();
        router.refresh();
      }
    } catch (error) {
      errorNotification("Oops! Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap flex-col justify-center content-center py-8 px-4 sm:px-6 lg:px-8 h-100 bg-gray-100">
      <h1 className="text-[64px] text-red-100 font-bold text-center mb-8">
        Diskusi
      </h1>

      <div className="w-11/12 p-5 mb-10 h-[56vh] overflow-auto flex flex-col gap-8 scrollbar-hide">
        {post.posts.length ? (
          post.posts.map((item) => <DiscussionItem key={item.id} data={item} />)
        ) : (
          <div className="text-center align-center text-[28px] mb-2 text-red-100 font-semibold h-[50vh] flex justify-center items-center">
            <p>No discussion yet! </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sticky bottom-12 w-11/12 p-5 mb-4 no-scrollbar">
        <div
          onClick={() =>
            (document.getElementById("modal") as HTMLDialogElement).showModal()
          }
          className="drop-shadow-md cursor-pointer bg-blue-100 hover:bg-blue-200 rounded-lg overflow-hidden  w-full h-[85px] shadow-md flex items-center justify-center"
        >
          <p className="text-[30px] text-white font-semibold">
            + Start a Discussion!
          </p>
        </div>
      </div>

      <dialog
        id="modal"
        className="modal modal-bottom sm:modal-middle rounded-md bg-white"
      >
        <div className="modal-box w-[500px] py-4">
          <div className="modal-action">
            <h1 className="text-center text-red-100 font-bold text-xl mb-4">
              {" "}
              Create Discussion{" "}
            </h1>
            <form className="max-w-md mx-auto p-4" action="">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter the title"
                  name="title"
                  id=""
                  className={`${inputClass} bg-gray-100 border-none`}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <TextareaAutosize
                  minRows={5}
                  name="content"
                  className={`${inputClass} bg-gray-100 border-none`}
                  placeholder="Enter the content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
            <form method="dialog" className="max-w-md mx-auto p-4 pt-0">
              {/* if there is a button in form, it will close the modal */}
              <button className=" btn text-black font-bold py-1 px-2 rounded absolute top-1 right-1 mt-2 mr-2 text-xs">
                <IoClose size={24} className="hover:drop-shadow" />
              </button>
              <button
                onClick={() => formData.title && formData.content ? handleSubmit() : () => {}}
                className="bg-blue-100 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default DiscussionPage;
