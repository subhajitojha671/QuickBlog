import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableitem = ({ blog, index, fetchBlogs }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });
      if (data.success) { toast.success(data.message); await fetchBlogs(); }
      else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) { toast.success(data.message); await fetchBlogs(); }
      else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  };

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-50 transition-colors align-top'>
      <td className='px-3 sm:px-4 py-4 text-sm font-medium text-gray-500 text-center'>{index + 1}</td>

      <td className='px-3 sm:px-4 py-4'>
        <p className='font-semibold text-gray-800 line-clamp-2 max-w-[160px] sm:max-w-xs'>{title}</p>
        {/* Shown only on small screens where date/status columns are hidden */}
        <div className='sm:hidden flex items-center gap-2 mt-2'>
          <span className='text-xs text-gray-400 whitespace-nowrap'>
            {BlogDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${
            blog.isPublished
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-orange-50 text-orange-700 border-orange-200"
          }`}>
            {blog.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
      </td>

      <td className='px-4 py-4 text-sm text-gray-500 max-sm:hidden whitespace-nowrap'>
        {BlogDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
      </td>

      <td className='px-4 py-4 max-sm:hidden'>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${
          blog.isPublished
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-orange-50 text-orange-700 border-orange-200"
        }`}>
          {blog.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>

      <td className='px-3 sm:px-4 py-4'>
        <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
          <button
            onClick={togglePublish}
            className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-lg transition-colors border whitespace-nowrap ${
              blog.isPublished
                ? 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                : 'bg-primary text-white border-transparent hover:bg-primary/90'
            }`}
          >
            {blog.isPublished ? 'Unpublish' : 'Publish Now'}
          </button>

          <button
            onClick={deleteBlog}
            className='flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap'
            title="Delete Blog"
          >
            <img src={assets.bin_icon} className='w-4' alt='Delete' />
            <span className='hidden xs:inline'>Bin</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableitem;