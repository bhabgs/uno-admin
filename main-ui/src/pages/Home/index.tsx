import { useNavigate } from 'react-router-dom';

const Index = () => {
  const nav = useNavigate();
  return (
    <div>
      123
      <button onClick={() => nav('/menu')}>go to login</button>
    </div>
  );
};
export default Index;
