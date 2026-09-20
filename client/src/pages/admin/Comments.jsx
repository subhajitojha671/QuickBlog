import React, { useEffect, useState } from 'react'
import CommentsTableItem from '../../components/admin/CommentsTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')
  const {axios} = useAppContext();

  const fetchComments = async ()=>{ /* untouched */
    try{
      const {data} = await axios.get('/api/admin/comments') 
      data.success ? setComments(data.comments) : toast.error(data.message)
    }catch(error){ toast.error(error.message) }
  }

  useEffect(()=>{ fetchComments(); },[])

  return (
    <div className='p-6 md:p-10'>
      
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Comments</h1>
          <p className='text-sm text-gray-500 mt-1'>Moderate user comments on your articles.</p>
        </div>

        <div className='flex bg-gray-100 p-1 rounded-full'>
          <button 
            onClick={()=> setFilter('Not Approved')} 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === 'Not Approved' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending
          </button>
          <button 
            onClick={()=> setFilter('Approved')} 
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === 'Approved' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Approved
          </button>
        </div>
      </div>

      <div className='bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left whitespace-nowrap'>
            <thead className='text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100'>
              <tr>
                <th className='px-6 py-4 font-medium'>Blog Title & Comment</th>
                <th className='px-6 py-4 font-medium max-sm:hidden'>Date</th>
                <th className='px-6 py-4 font-medium'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {comments
                .filter((comment) => filter === 'Approved' ? comment.isApproved : !comment.isApproved)
                .map((comment, index)=>(
                  <CommentsTableItem 
                    key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments}
                  />
                ))
              }
              {comments.filter((comment) => filter === 'Approved' ? comment.isApproved : !comment.isApproved).length === 0 && (
                <tr>
                   <td colSpan="3" className="px-6 py-8 text-center text-gray-500">No {filter.toLowerCase()} comments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}

export default Comments