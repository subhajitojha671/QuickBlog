import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error("Please enter a title first");
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) { quillRef.current.root.innerHTML = parse(data.content); } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); } finally { setLoading(false); }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); setIsAdding(true);
    try {
      const formData = new FormData();
      formData.append('title', title); formData.append('subTitle', subtitle); formData.append('description', quillRef.current.root.innerHTML); formData.append('category', category); formData.append('isPublished', isPublished); formData.append('image', image);
      const { data } = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null); setTitle(''); setSubtitle(''); setCategory('Startup'); setIsPublished(false); quillRef.current.root.innerHTML = '';
      } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); } finally { setIsAdding(false); }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) { quillRef.current = new Quill(editorRef.current, { theme: 'snow' }); }
  }, []);

  return (
    <div className='p-4 sm:p-6 md:p-10 max-w-4xl mx-auto lg:mx-0'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900'>Create New Blog</h1>
        <p className='text-gray-500 text-sm mt-1'>Fill out the details below to publish a new article.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='bg-white border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-6 md:p-8 space-y-6'>
        
        {/* Upload Thumbnail */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Thumbnail Image</label>
          <label htmlFor="image" className='flex flex-col items-center justify-center w-full max-w-md h-40 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt='thumbnail' className='w-full h-full object-cover'/>
            ) : (
              <div className='text-center'>
                <img src={assets.upload_area} alt='' className='w-8 mx-auto mb-2 opacity-50'/>
                <span className='text-sm text-gray-500 font-medium'>Click to upload image</span>
              </div>
            )}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        {/* Title & Category */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Blog Title</label>
            <input type='text' placeholder='Enter an engaging title' required 
              className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900' 
              onChange={(e) => setTitle(e.target.value)} value={title}
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900'>
              {blogCategories.map((item, index) => (<option key={index} value={item}>{item}</option>))}
            </select>
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Subtitle / Excerpt</label>
          <input type='text' placeholder='A brief summary of your article' required className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900' onChange={(e) => setSubtitle(e.target.value)} value={subtitle} />
        </div>

        {/* Description Editor Container */}
        <div className='relative'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Content</label>
          
          <div className='relative rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white'>
            <div className='h-[300px]'>
              <div ref={editorRef} className='h-full border-none'></div>
            </div>

            {/* AI Button Positioned Bottom Right */}
            <button disabled={loading} type='button' onClick={generateContent}
              className='absolute bottom-3 right-3 z-20 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 disabled:opacity-50'
            >
              ✨ {loading ? "Generating..." : "Generate with AI"}
            </button>

            {/* Global Loading Overlay for Editor */}
            {loading && (
              <div className='absolute inset-0 flex flex-col gap-3 items-center justify-center bg-white/80 backdrop-blur-sm z-30'>
                <div className='w-10 h-10 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin'></div>
                <p className='text-sm font-medium text-purple-700'>AI is writing your content...</p>
              </div>
            )}
          </div>
        </div>

       {/* Publish Checkbox & Submit */}
<div className='flex items-center justify-between pt-4'>
  
  {/* Corrected Checkbox Wrapper */}
  <label className='flex items-center gap-3 cursor-pointer group'>
    <div className='relative'>
      <input 
        type='checkbox' 
        checked={isPublished} 
        onChange={(e) => setIsPublished(e.target.checked)} 
        className='sr-only peer' 
      />
      {/* Visual toggle switch */}
      <div className='w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-purple-600 transition-all after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full'></div>
    </div>
    <span className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
      {isPublished ? "Published" : "Draft"}
    </span>
  </label>

  <button disabled={isAdding} type='submit' 
    className='px-8 py-2.5 bg-gray-900 text-white font-medium rounded-full cursor-pointer hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed'
  >
    {isAdding ? "Saving..." : "Save Blog"}
  </button>
</div>
      </form>
    </div>
  );
};

export default AddBlog;