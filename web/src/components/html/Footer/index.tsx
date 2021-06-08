import React from 'react'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'

import { breakpoints } from '@utils/breakpoints'

const Footer = ({ location, show, setShow, glitchFinished, isShop }: any) => {
  const isWebshop = location && location.pathname.includes('/shop')

  return (
    <FooterStyled className={isShop && 'is-shop'}>
      <div>
        {!isWebshop && (
          <div className="scroll-container">
            <div
              className={`scroll-indicator ${show ? 'hidden-xs' : ''}`}
              onClick={() => setShow(!show)}
            >
              <div>
                <img
                  className={`scroll-anim ${!show ? 'fade in' : 'fade'}`}
                  src="/arrow-down.svg"
                />
                <img
                  className={`hidden-xs ${show ? 'fade in' : 'fade'}`}
                  src="/close-1.svg"
                />
              </div>
            </div>
            {/* <p>MORE TO COME... WORKING ON BEING BETTER</p> */}
          </div>
        )}
      </div>

      <div
        className={`${
          isWebshop || (show && glitchFinished) ? 'fade in' : 'fade'
        }`}
      >
        <div
          className={`visible-xs`}
          style={{ visibility: isWebshop ? 'hidden' : undefined }}
        >
          <div
            className="scroll-indicator"
            style={{ margin: '0 auto 10px' }}
            onClick={() => setShow(!show)}
          >
            <div className="close-only">
              <img
                className={`${show ? 'fade in' : 'fade'}`}
                src="/close-1.svg"
              />
            </div>
          </div>
        </div>
        <div>
          <p>
            <div style={{ display: 'inline' }}>
              &copy; CIVIS MUNDI 2021 ALL RIGHTS RESERVED{' '}
              <span> &middot; </span>
            </div>
            {!isWebshop ? (
              <Link className="page-link" to="/shop">
                SHOP
              </Link>
            ) : (
              <Link className="page-link" to="/">
                HOME
              </Link>
            )}
          </p>
        </div>
        <div>
          <p>
            <a
              target="_blank"
              href="mailto: hello@civismundi.world"
              rel="noreferrer"
            >
              HELLO@CIVISMUNDI.WORLD &middot;{' '}
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/civismundi.world/"
              rel="noreferrer"
              className="instagram-link"
            >
              {' '}
              INSTAGRAM
            </a>
          </p>
        </div>
      </div>
    </FooterStyled>
  )
}

const scrollAnim = keyframes`
  0% {transform: translate(-50%, 0)}
  50% {transform: translate(-50%, -4px)}
  55% {transform: translate(-50%, -4px)}
  100% {transform: translate(-50%, 0)}
`

const FooterStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 15px 15px;
  bottom: 0;
  width: 100%;
  pointer-events: initial;
  z-index: 100000;

  @media ${breakpoints.phoneOnly} {
    padding: 0 15px 5px;
  }

  .page-link {
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;

    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  .instagram-link {
    margin-left: 5px;
  }

  &.is-shop {
    position: relative;
    left: auto;
    right: auto;
    bottom: 0 auto;
    z-index: initial;
  }

  & > div {
    display: flex;
    align-items: flex-end;

    &:first-child {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      justify-content: center;
      text-align: center;
      transition: all 4s;

      p {
        font-size: 14px;

        @media ${breakpoints.phoneOnly} {
          font-size: 12px;
        }
      }

      // @media ${breakpoints.phoneOnly} {
      //   order: 1;
      //   border-bottom: 1px solid rgba(255, 255, 255, 0.75);
      // }

      img.fade {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;

        &.in {
          opacity: 1;
        }
      }
    }

    &:last-child {
      justify-content: space-between;

      &.fade {
        opacity: 0;
        pointer-events: none;
        transition: opacity 1.2s;

        &.in {
          opacity: 1;
          transition: opacity 2s;
          pointer-events: initial;
        }
      }

      @media ${breakpoints.phoneOnly} {
        flex-wrap: wrap;
        text-align: center;

        & > div {
          width: 100%;

          p span {
            display: none;
          }

          p {
            display: flex;
            justify-content: space-between;
          }

          &:nth-child(1) {
            order: 1;
            padding-top: 5px;

            p {
              font-size: 9px;
            }
          }

          &:nth-child(2) {
            order: 3;
            padding-bottom: 5px;

            p {
              font-size: 12px;
            }
          }

          &:nth-child(3) {
            order: 2;
            padding-bottom: 5px;
            padding-top: 5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.85);
            border-top: 1px solid rgba(255, 255, 255, 0.85);
            margin-bottom: 5px;

            p {
              justify-content: flex-start;
            }

            p,
            a {
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  p {
    font-size: 14px;
    margin: 0;
  }

  .scroll-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    max-width: 315px;
    flex-wrap: wrap;
    margin-bottom: 15px;

    p {
      margin-top: 10px !important;
    }

    @media ${breakpoints.phoneOnly} {
      max-width: 280px;
      margin-bottom: 0;
    }
  }

  .scroll-indicator {
    pointer-events: initial;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid grey;
    position: relative;
    display: block;
    cursor: pointer;

    @media ${breakpoints.phoneOnly} {
      margin-bottom: 20px;
    }

    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &:not(.close-only) {
        transform: translate(-50%, -35%);
      }

      img {
        width: 10px;
        height: auto;

        &.scroll-anim {
          animation: ${scrollAnim} 1.7s infinite ease;
        }
      }
    }
  }

  .f-bold {
    font-family: 'Druk Wide Super';
    font-weight: 700;
  }
`

export default Footer
