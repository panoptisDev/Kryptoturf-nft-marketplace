import React, { useState } from 'react';
import logo from '../../src/images/logo.png';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { me, logout } from '../adapters/user';
import { HiMenu, HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

interface NavbarProps {}

const NavbarItem = ({
  title,
  classProps,
}: {
  title?: any;
  classProps?: any;
}) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, isFetching } = useQuery('me', me);
  const [toggleMenu, setToggleMenu] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    (await !data?.id) ? navigate('/login') : logout();
    // logout();
    await me();
    await queryClient.invalidateQueries('me');
  };
  return (
    <div className="w-full flex md:justify-center justify-between items-center">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="cursor-pointer"></img>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
          <NavbarItem key={item + index} title={item} />
        ))}
        <button
          onClick={handleSubmit}
          className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          {isLoading
            ? 'Loading'
            : isError
            ? 'Something went wrong'
            : !data?.id
            ? 'Login'
            : 'Logout'}
        </button>
      </ul>

      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul className="z-index fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md text-white animate-slide-in blue-glassmorphism ">
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
