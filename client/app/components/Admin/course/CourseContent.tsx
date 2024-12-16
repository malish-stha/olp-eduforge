import { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BiSolidPencil } from 'react-icons/bi';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { BsLink45Deg } from 'react-icons/bs';

import { styles } from '@/app/styles/style';
import AdminHeader from '../topbar/AdminHeader';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
  isEdit: boolean;
};

const CourseContent: React.FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
  isEdit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setactiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapsedToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    setCourseContentData((prevData: any) => {
      const updatedData = prevData.map((item: any, itemIndex: number) => {
        if (itemIndex === index) {
          // Check if all existing links have non-empty titles and URLs
          const areAllLinksValid = item.links.every(
            (link: any) => link.title !== '' && link.url !== ''
          );

          // If all links are valid, create a deep copy of the item and the links array
          if (areAllLinksValid) {
            const newItem = { ...item };
            newItem.links = [...item.links, { title: '', url: '' }];
            return newItem;
          } else {
            toast.error(
              'Please fill existing link fields before adding a new link.'
            );
          }
        }
        return item;
      });
      return updatedData;
    });
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.links[0].title === '' ||
      item.links[0].url === ''
    ) {
      toast.error('Please fill the fields first.');
    } else {
      let newVideoSection = '';

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last video section if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: newVideoSection,
        links: [{ title: '', url: '' }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Please fill all the fields first.');
    } else {
      setactiveSection(active + 1);
      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: '', url: '' }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Section cant be empty.');
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const handleVideoLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCourseContentData = [...courseContentData]; // Create a shallow copy
    updatedCourseContentData[index] = {
      ...updatedCourseContentData[index], // Create a shallow copy of the item
      videoLength: e.target.value, // Update the videoLength property
    };
    setCourseContentData(updatedCourseContentData); // Update the state with the new array
  };

  const handleVideoSectionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCourseContentData = [...courseContentData];
    updatedCourseContentData[index] = {
      ...updatedCourseContentData[index],
      videoSection: e.target.value,
    };
    setCourseContentData(updatedCourseContentData);
  };

  const handleVideoTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCourseContentData = [...courseContentData];
    updatedCourseContentData[index] = {
      ...updatedCourseContentData[index],
      title: e.target.value,
    };
    setCourseContentData(updatedCourseContentData);
  };

  const handleVideoUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCourseContentData = [...courseContentData];
    updatedCourseContentData[index] = {
      ...updatedCourseContentData[index],
      videoUrl: e.target.value,
    };
    setCourseContentData(updatedCourseContentData);
  };

  const handleVideoDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedCourseContentData = [...courseContentData];
    updatedCourseContentData[index] = {
      ...updatedCourseContentData[index],
      description: e.target.value,
    };
    setCourseContentData(updatedCourseContentData);
  };

  const handleLinkTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    linkIndex: number
  ) => {
    setCourseContentData((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[sectionIndex] = {
        ...updatedData[sectionIndex],
        links: updatedData[sectionIndex].links.map((link: any, idx: any) => {
          if (idx === linkIndex) {
            return {
              ...link,
              title: e.target.value,
            };
          }
          return link;
        }),
      };
      return updatedData;
    });
  };

  const handleLinkUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    linkIndex: number
  ) => {
    setCourseContentData((prevData: any) => {
      const updatedData = [...prevData];
      updatedData[sectionIndex] = {
        ...updatedData[sectionIndex],
        links: updatedData[sectionIndex].links.map((link: any, idx: any) => {
          if (idx === linkIndex) {
            return {
              ...link,
              url: e.target.value,
            };
          }
          return link;
        }),
      };
      return updatedData;
    });
  };

  return (
    <div className="w-[80%] m-auto mt-10 p-3">
      <AdminHeader
        title={`${isEdit ? 'EDIT COURSE' : 'CREATE COURSE'}`}
        subtitle={`${isEdit ? 'Edit course content' : 'Add course content'}`}
      />
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#f2f0f0] dark:bg-[#cdc8c817] p-4 ${
                  showSectionInput ? 'mt-10' : 'mb-0'
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full  items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === 'Untitled Section'
                            ? 'w-[170px]'
                            : 'w-min'
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => handleVideoSectionChange(e, index)}
                      />
                      <BiSolidPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                  </>
                )}
                <br />
                <div className="flex w-full items-center justify-between my-0 relative">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}, {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* collapsed video content */}
                  <div className="flex items-center absolute right-0 top-0">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? 'cursor-pointer' : 'hidden'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize={30}
                      className="dark:text-white text-black cursor-pointer"
                      style={{
                        transform: isCollapsed[index]
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapsedToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Enter video title"
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => handleVideoTitleChange(e, index)}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="Enter video url"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => handleVideoUrlChange(e, index)}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter video length"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => handleVideoLengthChange(e, index)}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={10}
                        placeholder="Enter video description"
                        className={`${styles.input} !h-min p-2`}
                        value={item.description}
                        onChange={(e) => handleVideoDescriptionChange(e, index)}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0 ? 'hidden' : 'cursor-pointer'
                            } dark:text-white text-black text-[20px]`}
                            onClick={() => {
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex);
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source code title"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) =>
                            handleLinkTitleChange(e, index, linkIndex)
                          }
                        />
                        <input
                          type="text"
                          placeholder="Source code url"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) =>
                            handleLinkUrlChange(e, index, linkIndex)
                          }
                        />
                      </div>
                    ))}
                    <br />
                    {/* add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2 text-[#2e7c67]" />{' '}
                      Add new content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <p className="flex items-center text-[18px] dark:text-white text-black cursor-pointer">
            <AiOutlinePlusCircle className="mr-2  text-[#db4f4a]" /> Add new
            section
          </p>
        </div>
      </form>
      <br />
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
    </div>
  );
};

export default CourseContent;
