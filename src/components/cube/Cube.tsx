import './cube.css';

export const Cube = () => {
  return (
    <div className='cube-container'>
      <div className='cube'>
        <div className='face front'>
          <img src='/images/cube_face.png' alt='Front' />
        </div>
        <div className='face back'>
          <img src='/images/cube_face.png' alt='Back' />
        </div>
        <div className='face right'>
          <img src='/images/cube_face.png' alt='Right' />
        </div>
        <div className='face left'>
          <img src='/images/cube_face.png' alt='Left' />
        </div>
        <div className='face top'>
          <img src='/images/cube_face.png' alt='Top' />
        </div>
        <div className='face bottom'>
          <img src='/images/cube_face.png' alt='Bottom' />
        </div>
      </div>
    </div>
  );
};
