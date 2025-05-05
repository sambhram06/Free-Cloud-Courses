import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RoleCourses.css';
import { div } from 'framer-motion/m';
import Footer from '../Nav/Footer';
import NavbarAzu from '../Nav/NavbarAzu';
 
function normalizeRoleName(role) {
  return role.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
 
export default function RoleCourses() {
  const { roleName } = useParams();
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 9;
 
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch('https://learn.microsoft.com/api/learn/catalog/');
        const data = await res.json();
        const normalizedRole = normalizeRoleName(roleName);
 
        const roleModules = data.modules
          .filter(module =>
            module.roles?.some(role => normalizeRoleName(role) === normalizedRole)
          )
          .map(module => ({ ...module, type: 'module' }));
 
        const roleLearningPaths = data.learningPaths
          .filter(path =>
            path.roles?.some(role => normalizeRoleName(role) === normalizedRole)
          )
          .map(path => ({ ...path, type: 'learningPath' }));
 
        const combinedContent = [...roleModules, ...roleLearningPaths];
 
        setContent(combinedContent);
        setFilteredContent(combinedContent);
 
        const initialFlips = {};
        combinedContent.forEach(item => {
          initialFlips[item.uid] = false;
        });
        setFlippedCards(initialFlips);
      } catch (err) {
        console.error('Failed to fetch content:', err);
      } finally {
        setLoading(false);
      }
    }
 
    fetchContent();
  }, [roleName]);
 
  useEffect(() => {
    let filtered = content.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedLevel || item.levels?.includes(selectedLevel)) &&
      (!selectedProduct || item.products?.includes(selectedProduct)) &&
      (!selectedType || item.type === selectedType)
    );
    setFilteredContent(filtered);
    setPage(1);
  }, [searchTerm, selectedLevel, selectedProduct, selectedType, content]);
 
  const paginatedContent = filteredContent.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredContent.length / pageSize);
 
  const toggleFlip = (uid) => {
    setFlippedCards(prev => ({
      ...prev,
      [uid]: !prev[uid]
    }));
  };
 
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[#20629b]">
        <div className="animate-spin rounded-full mb-6 h-14 w-14 border-4 border-[#20629b] border-t-transparent"></div>
        <div className="text-xl font-semibold animate-pulse flex items-center gap-2">
          Loading...
        </div>
      </div>
    );
  }
 
  return (
    <div>
      <NavbarAzu />
      <div className="mt-10">
        <h2>
          <span className="p-3 ml-30 text-[#f15645] text-2xl mt-6 mb-8 font-bold font-sans">I</span>{' '}
          <span className="text-2xl text-[#20629b] mt-6 mb-8 font-bold font-sans">
            Courses for {roleName.replace(/-/g, ' ')}
          </span>
        </h2>
 
        <div className="p-3 ml-30 mr-30 mb-4 mt-5">
          <input
            type="text"
            placeholder="Search modules and learning paths..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-[#20629b] rounded-md px-4 py-2 w-full hover:bg-[#fafafd] transition duration-500 shadow-md hover:shadow-gray-500/50 transform hover:scale-105 hover:border-[#20629b]"
          />
        </div>
 
        <div className="mb-8 p-3 ml-30 mr-30 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            value={selectedLevel}
            onChange={e => setSelectedLevel(e.target.value)}
            className="border border-[#20629b] rounded-md px-4 py-2 hover:bg-[#fafafd] transition shadow-md hover:shadow-gray-500/50 transform hover:scale-105 hover:border-[#20629b]"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
 
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
            className="border border-[#20629b] rounded-md px-4 py-2 hover:bg-[#fafafd] transition shadow-md hover:shadow-gray-500/50 transform hover:scale-105 hover:border-[#20629b]"
          >
            <option value="">All Products</option>
            {[...new Set(content.flatMap(m => m.products || []))].sort().map(product => {
              const formatted = product
                .split(/[\s-]/)
                .map(word => word.toLowerCase() === 'ai' ? 'AI' : word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              return (
                <option key={product} value={product}>{formatted}</option>
              );
            })}
          </select>
 
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="border border-[#20629b] rounded-md px-4 py-2 hover:bg-[#fafafd] transition shadow-md hover:shadow-gray-500/50 transform hover:scale-105 hover:border-[#20629b]"
          >
            <option value="">All Types</option>
            <option value="module">Module</option>
            <option value="learningPath">Learning Path</option>
          </select>
 
          {(selectedLevel || selectedProduct || selectedType || searchTerm) && (
            <button
              onClick={() => {
                setSelectedLevel('');
                setSelectedProduct('');
                setSelectedType('');
                setSearchTerm('');
              }}
              className="border border-[f15645] text-[#f15645] font-medium rounded-md px-4 py-2 hover:bg-red-100 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
 
        {filteredContent.length === 0 ? (
          <div className="text-center py-12 text-gray-600 flex flex-col items-center">
            <p className="text-xl font-semibold">No courses found.</p>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "Roboto, sans-serif" }} className="grid grid-cols-1 p-3 ml-30 mr-30 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedContent.map(item => (
                <div
                  key={item.uid}
                  className="flip-card h-[300px]"
                  onClick={() => toggleFlip(item.uid)}
                >
                  <div className={`flip-card-inner flip-card:hover ${flippedCards[item.uid] ? 'rotate' : ''}`}>
                    <div className="flip-card-front">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-lg font-semibold mb-2 text-[#55555] hover:underline block"
                      >
                        {item.title}
                      </a>
                      <p className="text-sm text-gray-600 mt-1 mb-2">
                        {item.type === 'module' ? `🕒 Duration: ${item.duration_in_minutes} min` : ' Learning Path'}
                      </p>
                      {item.rating && (
                        <p className="text-sm text-[#d0b92b] mb-2">
                          ☆ Rating: {item.rating?.average || 0} ({item.rating?.count || 0})
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 text-xs mb-1">
                        {item.products?.slice(0, 3).map(product => (
                          <span key={product} className="bg-blue-50 text-[#20629b] mt-2 px-2 py-1 rounded-full">{product}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 text-xs">
                        {item.levels?.map(level => (
                          <span key={level} className="bg-green-50 mt-2 text-[#009ba7] px-2 py-1 rounded-full">{level}</span>
                        ))}
                      </div>
                    </div>
 
                    <div className="flip-card-back">
                      <h4 className="text-md font-semibold text-[#20629b] mb-2">Description</h4>
                      <p className="text-sm text-gray-700 line-clamp-6 mb-4">{item.summary}</p>
                      {item.units && (
                        <p className="text-sm text-gray-600 mb-4">🗂️ {item.units?.length || 0} Units</p>
                      )}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="mt-auto text-sm font-semibold text-[#20629b] underline"
                      >
                        Go to Course →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            <div className="mt-6 flex justify-center mb-10 p-5 items-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 bg-[#20629b] text-white rounded disabled:opacity-50 hover:bg-sky-100 hover:text-black"
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-4 py-2 bg-[#20629b] text-white rounded disabled:opacity-50 hover:bg-sky-100 hover:text-black"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
 