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

  const fetchBlogData = async () => { /* Logic untouched */
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) { setData(data.blog); } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  };

  const fetchComments = async () => { /* Logic untouched */
    try {
      const { data } = await axios.post('/api/blog/comment', { blogId: id });
      if (data.success) { setComments(data.comments); } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  };

  const addComment = async (e) => { /* Logic untouched */
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success) {
        toast.success("Comment added");
        setName(''); setContent(''); fetchComments();
      } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  };

  useEffect(() => {
    fetchBlogData(); fetchComments();
  }, [id]);

  if (!data) return <Loader />;

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Blog Header */}
      <div className='max-w-3xl mx-auto text-center mt-20 px-6'>
        <p className='text-primary text-sm font-semibold tracking-wide uppercase mb-4'>
          Published on {Moment(data.createdAt).format('MMMM Do, YYYY')}
        </p>

        <h1 className='text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6'>
          {data.title}
        </h1>

        <h2 className='text-lg md:text-xl text-gray-500 mb-8 font-light leading-relaxed'>
          {data.subTitle}
        </h2>

        <div className='flex items-center justify-center gap-3 mb-12'>
           <div className='w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold'>MB</div>
           <p className='text-sm font-medium text-gray-900'>Michoel Brown</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className='max-w-3xl mx-auto px-6 pb-20'>
        <img 
          src={data.image} 
          alt={data.title}  
          className='w-full rounded-3xl mb-12 shadow-md aspect-video object-cover'
        />

        <div 
          className='prose prose-lg prose-gray max-w-none mb-20' 
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        <hr className='border-gray-100 mb-12'/>

        {/* COMMENTS SECTION */}
        <div className='mb-16'>
          <h3 className='text-2xl font-bold text-gray-900 mb-8'>
            Comments <span className='text-gray-400 font-normal'>({comments.length})</span>
          </h3>

          <div className='space-y-6'>
            {comments.length > 0 ? (
              comments.map((item, index) => (
                <div key={index} className='bg-gray-50 p-6 rounded-2xl border border-gray-100'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                         <img src={assets.user_icon} alt='' className='w-4 opacity-50'/>
                      </div>
                      <p className='font-semibold text-gray-900'>{item.name}</p>
                    </div>
                    <span className='text-xs text-gray-400'>
                      {Moment(item.createdAt).fromNow()}
                    </span>
                  </div>
                  <p className='text-gray-600 pl-11 text-sm leading-relaxed'>
                    {item.content}
                  </p>
                </div>
              ))
            ) : (
              <p className='text-gray-500 italic'>Be the first to share your thoughts.</p>
            )}
          </div>
        </div>

        {/* ADD COMMENT */}
        <div className='bg-white border border-gray-200 p-5 sm:p-8 rounded-3xl shadow-sm'>
          <h3 className='text-xl font-bold text-gray-900 mb-6'>Leave a reply</h3>
          <form onSubmit={addComment} className='flex flex-col gap-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Your Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} value={name} 
                type='text' placeholder='John Doe' required 
                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Your Comment</label>
              <textarea 
                onChange={(e) => setContent(e.target.value)} value={content} 
                placeholder='What are your thoughts?' required
                className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-32 resize-none'
              ></textarea>
            </div>
            <button type='submit' className='self-start bg-gray-900 text-white font-medium rounded-full py-3 px-8 hover:bg-gray-800 transition-all active:scale-95 cursor-pointer'>
              Post Comment
            </button>
          </form>
        </div>

        {/* SHARE */}
        <div className='mt-20 flex flex-col items-center justify-center text-center'>
          <p className='text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6'>Share this article</p>
          <div className='flex gap-4'>
            <img src={assets.facebook_icon} className='w-10 hover:opacity-80 cursor-pointer transition-opacity' alt='Facebook'/>
            <img src={assets.twitter_icon} className='w-10 hover:opacity-80 cursor-pointer transition-opacity' alt='Twitter'/>
            <img src={assets.googleplus_icon} className='w-10 hover:opacity-80 cursor-pointer transition-opacity' alt='Google'/>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Blog;