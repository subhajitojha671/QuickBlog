import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentsTableItem = ({ comment, index, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const ApproveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id });
      if (data.success) { toast.success(data.message); fetchComments(); }
      else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  }

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this comment?");
      if (!confirm) return;
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      if (data.success) { toast.success(data.message); fetchComments(); }
      else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
  }

  return (
    <tr className='border-b border-gray-200 hover:bg-gray-50 transition-colors align-top'>
      <td className='px-4 sm:px-6 py-5 whitespace-normal'>
        <div className='flex flex-col gap-1.5 max-w-[220px] sm:max-w-none'>
          <p className='text-sm text-gray-500'>
            Blog: <span className='font-semibold text-gray-800'>{blog.title}</span>
          </p>
          <p className='text-sm text-gray-500'>
            User: <span className='font-semibold text-gray-800'>{comment.name}</span>
          </p>
          <div className='mt-2 pl-3 border-l-2 border-primary/40'>
            <p className='text-gray-700 italic text-sm break-words'>"{comment.content}"</p>
          </div>
          <span className='sm:hidden text-xs text-gray-400 mt-1'>
            {createdAt ? BlogDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "No Date"}
          </span>
        </div>
      </td>

      <td className='px-6 py-5 text-sm text-gray-500 max-sm:hidden whitespace-nowrap'>
        {createdAt ? BlogDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "No Date"}
      </td>

      <td className='px-4 sm:px-6 py-5'>
        <div className='flex flex-wrap items-center gap-2 sm:gap-4'>
          {!comment.isApproved ? (
            <button
              onClick={ApproveComment}
              className='flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors whitespace-nowrap'
            >
              <img src={assets.tick_icon} alt="Approve" className='w-4' />
              Approve
            </button>
          ) : (
            <span className='px-3 py-1.5 text-xs font-semibold tracking-wide text-green-700 bg-green-50 border border-green-200 rounded-full whitespace-nowrap'>
              Approved
            </span>
          )}

          <button
            onClick={deleteComment}
            className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
            title="Delete Comment"
          >
            <img src={assets.bin_icon} alt='Delete' className='w-5' />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentsTableItem