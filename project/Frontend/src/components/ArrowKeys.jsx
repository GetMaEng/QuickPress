import { useEffect } from 'react';

function ArrowKeyListener() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          console.log('Up arrow pressed');
          break;
        case 'ArrowDown':
          console.log('Down arrow pressed');
          break;
        case 'ArrowLeft':
          console.log('Left arrow pressed');
          break;
        case 'ArrowRight':
          console.log('Right arrow pressed');
          break;
          case ' ':
            console.log('Space pressed');
            
        default:
            
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div>Press arrow keys and check the console</div>;
}

export default ArrowKeyListener;