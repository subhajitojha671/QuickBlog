import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Blog = () => {

  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  // 🔹 Fetch Blog
  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Fetch Comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comment', {
        blogId: id,
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Add Comment
  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/blog/add-comment', {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success("Comment added");
        setName('');
        setContent('');
        fetchComments(); // refresh comments
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔹 Load Data
  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  // 🔹 Loader
  if (!data) return <Loader />;

  return (
    <div className='relative'>

      {/* Background */}
      <img 
        src={assets.gradientBackground} 
        alt='' 
        className='absolute -top-50 -z-10 opacity-100'
      />

      <Navbar />

      {/* Blog Header */}
      <div className='text-center mt-20 text-gray-600'>

        <p className='text-primary py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>

        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.title}
        </h1>

        <h2 className='my-5 max-w-lg truncate mx-auto'>
          {data.subTitle}
        </h2>

        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          Michoel Brown
        </p>
      </div>

      {/* Blog Content */}
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>

        <img 
          src={data.image} 
          alt=''  
          className='rounded-3xl mb-5'
        />

        <div 
          className='rich-text max-w-3xl mx-auto' 
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* COMMENTS */}
        <div>

          <p className='mt-14 mb-10 max-w-3xl mx-auto'>
            Comments ({comments.length})
          </p>

          <div className='flex flex-col gap-4 items-center'>

            {comments.length > 0 ? (
              comments.map((item, index) => (
                <div 
                  key={index} 
                  className='relative bg-primary/5 border border-primary/10 max-w-xl w-full p-4 rounded text-gray-600'
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.user_icon} alt='' className='w-6'/>
                    <p className='font-medium'>{item.name}</p>
                  </div>

                  <p className='text-sm max-w-md ml-8'>
                    {item.content}
                  </p>

                  <div className='absolute right-4 bottom-3 text-xs'>
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-400'>
                No comments yet
              </p>
            )}
          </div>
        </div>

        {/* ADD COMMENT */}
        <div className='max-w-3xl mx-auto mt-10'>
          <p className='font-semibold mb-4'>Add your comment</p>

          <form 
            onSubmit={addComment} 
            className='flex flex-col items-start gap-4 max-w-lg'
          >
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              type='text' 
              placeholder='Name' 
              required 
              className='w-full p-2 border border-gray-300 rounded outline-none'
            />

            <textarea 
              onChange={(e) => setContent(e.target.value)} 
              value={content} 
              placeholder='Comment' 
              required
              className='w-full p-2 border border-gray-300 rounded outline-none h-40'
            ></textarea>

            <button 
              type='submit' 
              className='bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer'
            >
              Submit
            </button>
          </form>
        </div>

        {/* SHARE */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article</p>
          <div className='flex gap-3'>
            <img src={assets.facebook_icon} width={40} alt=''/>
            <img src={assets.twitter_icon} width={40} alt=''/>
            <img src={assets.googleplus_icon} width={40} alt=''/>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Blog;