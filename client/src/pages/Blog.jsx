import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'

const Blog = () => {

  // ✅ Get blog id from URL
  const { id } = useParams()

  // ✅ State for blog data
  const [data, setData] = useState(null)

  // ✅ State for comments
  const [comments, setComments] = useState([])

  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  // ✅ Fetch blog data based on id
  const fetchBlogData = async () => {
    // 🔥 IMPORTANT: convert _id to string (fix bug)
    const blog = blog_data.find(item => item._id.toString() === id)
    setData(blog)
  }

  // ✅ Fetch comments (currently all comments)
  const fetchComments = async () => {
    if (comments_data && comments_data.length > 0) {
      setComments(comments_data)
    } else {
      setComments([]) // fallback
    }
  }

  // add comment function (currently just logs data, no backend)
  const addComment = (e) => {
    e.preventDefault();
  }

  // ✅ Run when component loads OR id changes
  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  // ✅ Show loading if data not ready
  if (!data) {
    return <div className='text-center mt-20'>Loading...</div>
  }

  return (
    <div className='relative'>

      {/* ✅ Background image */}
      <img 
        src={assets.gradientBackground} 
        alt='' 
        className='absolute -top-50 -z-10 opacity-100'
      />

      <Navbar/>

      {/* ✅ Blog Header */}
      <div className='text-center mt-20 text-gray-600'>

        {/* Date */}
        <p className='text-primary py-4 font-medium'>
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>

        {/* Title */}
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
          {data.title}
        </h1>

        {/* Subtitle */}
        <h2 className='my-5 max-w-lg truncate mx-auto'>
          {data.subTitle}
        </h2>

        {/* Author (static for now) */}
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>
          Michoel Brown
        </p>
      </div>

      {/* ✅ Blog Content */}
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>

        {/* Image */}
        <img 
          src={data.image} 
          alt=''  
          className='rounded-3xl mb-5'
        />

        {/* Description (HTML content) */}
        <div 
          className='rich-text max-w-3xl mx-auto' 
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* ✅ COMMENTS SECTION */}
        <div>

          {/* Comment count */}
          <p className='mt-14 mb-10 max-w-3xl mx-auto'>
            Comments ({comments.length})
          </p>

          <div className='flex flex-col gap-4 items-center'>

            {/* ✅ If comments exist */}
            {comments.length > 0 ? (

              comments.map((item, index) => (
                <div 
                  key={index} 
                  className='relative bg-primary/5 border border-primary/10 max-w-xl w-full p-4 rounded text-gray-600'
                >

                  {/* 👤 User Info */}
                  <div className='flex items-center gap-2 mb-2'>
                    <img src={assets.user_icon} alt='' className='w-6'/>
                    <p className='font-medium'>{item.name}</p>
                  </div>

                  {/* 💬 Comment Text */}
                  <p className='text-sm max-w-md ml-8'>
                    {item.content}
                  </p>

                  {/* ⏱ Time */}
                  <div className='absolute right-4 bottom-3 text-xs'>
                    {Moment(item.createdAt).fromNow()}
                  </div>

                </div>
              ))

            ) : (

              // ❌ If no comments
              <p className='text-center text-gray-400'>
                No comments yet
              </p>

            )}

          </div>
        </div>
         {/* Add Comment Section */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form onClick={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
            <input onClick={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Name' required className='w-full p-2
             border border-gray-300 rounded outline-none'/>

             <textarea onClick={(e)=>setComment(e.target.value)} value={comment} placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48 required'></textarea>

             <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
          </form>
        </div>

        {/* Share button */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media</p>
          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt=''/>
            <img src={assets.twitter_icon} width={50} alt=''/>
            <img src={assets.googleplus_icon} width={50} alt=''/>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  ) 
}

export default Blog