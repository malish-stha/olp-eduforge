import { styles } from '@/app/styles/style';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from 'react-hot-toast';
import AdminHeader from '../topbar/AdminHeader';

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
  isEdit: boolean;
};

const CourseData: React.FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
  isEdit,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updateBenefits = [...benefits];
    updateBenefits[index].title = value;
    setBenefits(updateBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: '' }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatePrerequisites = [...prerequisites];

    updatePrerequisites[index].title = value;
    setPrerequisites(updatePrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: '' }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== '' &&
      prerequisites[prerequisites.length - 1]?.title !== ''
    ) {
      setActive(active + 1);
    } else {
      toast.error('Please fill the fields for go to next.');
    }
  };

  return (
    <div className="w-[80%] m-auto mt-10 block">
      <AdminHeader
        title={`${isEdit ? 'EDIT COURSE' : 'CREATE COURSE'}`}
        subtitle={`${
          isEdit
            ? 'Edit course benefits and Prerequisites'
            : 'Add course benefits and Prerequisites'
        }`}
      />

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benifit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benefits"
            placeholder="Enter course benefits"
            required
            className={`${styles.input} my-2`}
            value={benifit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddBenefits}
          className="text-black dark:text-white"
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the Prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="Enter course prerequisites"
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddPrerequisites}
          className="text-black dark:text-white"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center cursor-pointer h-[40px] bg-[#DC143C] text-center text-[#fff] rounded mt-8"
          onClick={() => prevButton()}
        >
          Back
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center cursor-pointer h-[40px] bg-[#DC143C] text-center text-[#fff] rounded mt-8"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseData;
