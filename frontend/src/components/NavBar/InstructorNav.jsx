import React, { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import { FaBlog } from "react-icons/fa";
import { intialLoadingComplete, logoutAction } from "../../redux/slices/authSlice";
// import { logout } from "../../redux/slices/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InstructorNavbar() {

  //navigate
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();

  //logout mutation

  //logout handler
  //logout handler
  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    dispatch(logoutAction());
    navigate('/login');
  };
  // const data = JSON.parse(localStorage.getItem('userInfo'));
  // console.log(data);

  return (
    <Disclosure as="nav" className="bg-bgNav ">
      {({ open }) => (
        <>
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-start items-center w-full">
              <div className="flex flex-row w-full">
                
                <div className="-ml-2 mr-2 flex items-left md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link
                to='/'
                 className="flex flex-shrink-0 items-center">
                  {/* Logo */}
                  <FaBlog className="h-8 w-auto text-orange-500" />
                </Link>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/instructor-add-course"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Add Course
                  </Link>
                  <Link
                    to="/instructor-courses"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Instructor Courses
                  </Link>
                  <Link
                    to="/instructor-course-sections"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    Instructor Course Sections
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    onClick={logoutHandler}
                    type="button"
                    className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  >
                    <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                    <span>Logout</span>
                  </button>
                </div>
                <div className="hidden md:ml-1 md:flex md:flex-shrink-0 md:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/student-dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={logoutHandler}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navs  private links*/}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Home
                </Disclosure.Button>
              </Link>
              <Link to="/instructor-courses">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Courses
                </Disclosure.Button>
              </Link>
              <Link to="/instructor-course-sections">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  My Course Section
                </Disclosure.Button>
              </Link>
            </div>
            {/* Profile links */}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-100">
                    <BellIcon
                      className="h-5 w-5 text-orange-500"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-red-700">
                  {JSON.parse(localStorage.getItem('userInfo')).username}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                  {JSON.parse(localStorage.getItem('userInfo')).email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {/* <Link to="/dashboard/settings">
                  <Disclosure.Button
                    as="button"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Settings
                  </Disclosure.Button>
                </Link> */}
                <Disclosure.Button
                  as="button"
                  onClick={logoutHandler}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default InstructorNavbar;  