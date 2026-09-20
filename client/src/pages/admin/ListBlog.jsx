import React, { useEffect, useState } from 'react'
import BlogTableitem from '../../components/admin/BlogTableitem'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {
   const[blogs, setBlogs] = useState([]);
   const {axios} = useAppContext();

   const fetchBlogs = async () => { /* untouched */
    try{
       const {data} = await axios.get('/api/admin/blogs')
       if(data.success){ setBlogs(data.blogs) }else{ toast.error(data.message) }
    }catch(error){ toast.error(error.message) }
   }

   useEffect(()=>{ fetchBlogs() },[])

  return (
    <div className='p-6 md:p-10'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900'>Manage Blogs</h1>
        <p className='text-sm text-gray-500 mt-1'>View and manage all published and drafted articles.</p>
      </div>

      <div className='bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left whitespace-nowrap'>
            <thead className='text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100'>
              <tr>
                <th scope='col' className='px-6 py-4 font-medium'>#</th>
                <th scope='col' className='px-6 py-4 font-medium'>Blog Title</th>
                <th scope='col' className='px-6 py-4 font-medium max-sm:hidden'>Date</th>
                <th scope='col' className='px-6 py-4 font-medium max-sm:hidden'>Status</th>
                <th scope='col' className='px-6 py-4 font-medium'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {blogs.map((blog, index)=>{
                return <BlogTableitem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListBlog