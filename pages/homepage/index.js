import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import * as _ from "lodash";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Homepage = () => {
  const router = useRouter();
  const [fetching, setFetching] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    total: "",
    totalHits: "",
    hits: [],
  });

  const [editorsResponse, setEditorsResponse] = useState({
    total: "",
    totalHits: "",
    hits: [],
  });

  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [expand, setExpand] = useState(false);

  const [hover, setHover] = useState(-1);

  const [showModal, setShowModal] = useState(false);

  const [likeCondition, setLikeCondition] = useState(false);

  const [like, setLike] = useState([{}]);

  const [individual, setIndividual] = useState({
    liked: false,
    id: "",
  });

  const expandFunc = (i) => {
    setHover(i);
  };

  const cancelExpandFunc = () => {
    setHover(-1);
  };

  const likeFunc = (i) => {
    if (individual.liked == false) {
      setIndividual({ liked: true, id: i });
    } else {
      setIndividual({ liked: false, id: i });
    }
  };

  const likeConditionFunc = () => {
    setLikeCondition(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showModalFunc = () => {
    setShowModal(true);
  };

  useEffect(() => {
    let fetching = true;

    async function fetchApi() {
      let fetchResponse;

      if (!_.isEmpty(search)) {
        setLoading(true);
        fetchResponse = await axios.get(
          `https://pixabay.com/api/?key=26032813-5eca57a90774446a771ac3a81&q=${search}`
        );
      }

      setApiResponse({ ...apiResponse, hits: fetchResponse?.data?.hits });
      console.log(fetchResponse);
      setLoading(false);
    }

    fetchApi();

    return () => {
      fetchApi = false;
    };
  }, [search]);

  useEffect(() => {
    let fetching = true;

    async function fetchApi() {
      let fetchResponse;

      setLoading(true);
      fetchResponse = await axios.get(
        `https://pixabay.com/api/?key=26032813-5eca57a90774446a771ac3a81&editors_choice=true`
      );

      setEditorsResponse({
        ...editorsResponse,
        totalHits: fetchResponse?.data?.totalHits,
        hits: fetchResponse?.data?.hits,
      });
      console.log(fetchResponse);
      setLoading(false);
    }

    fetchApi();

    return () => {
      fetchApi = false;
    };
  }, []);

  const onChangeFunc = (filter) => {
    setSearch(filter.target.value);
  };

  const openAlertFunc = (individualhit) => {
    MySwal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      html: (
        <i>
          <img src={individualhit.previewURL} />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <StyledSvg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{
                  cursor: "pointer",
                }}
                fill={
                  individual.id === individualhit.id && individual.liked == true
                    ? "red"
                    : "black"
                }
                onClick={() => likeFunc(individualhit.id)}
                className="svgicons"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </StyledSvg>

            <div style={{ visibility: "hidden" }}>Hi</div>
          </div>
        </i>
      ),
    });
  };

  return (
    <MainDiv>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div style={{ paddingTop: "30px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            paddingBottom: "50px",
          }}
        >
          <div style={{ visibility: "visible" }}>
            <h1>Homepage</h1>
          </div>

          <div
            style={{
              border: "1px solid black",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: "20px",
              paddingLeft: "20px",
              paddingRight: "100px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{
                fontSize: "18px",
                width: "18px",
                height: "18px",
                marginRight: "20px",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              style={{
                fontSize: "18px",
                borderWidth: "0px",
                borderStyle: "hidden",
              }}
              className="searchbar"
              onChange={onChangeFunc}
              placeholder="Search for images in here ..."
            ></input>
          </div>

          <div
            style={{
              visibility: "visible",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {editorsResponse.totalHits}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="blue"
              style={{ cursor: "pointer" }}
              className="headerbuttons"
              onClick={() => router.push("/likedimages")}
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 2fr)",
            gridAutoRows: "200px",
          }}
        >
          {apiResponse?.hits?.map((individualhit, i) => {
            return (
              <div
                onMouseEnter={() => expandFunc(i)}
                onMouseLeave={cancelExpandFunc}
                key={i}
              >
                {loading ? (
                  <ClipLoader />
                ) : (
                  <div
                    style={{
                      padding: "4px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={individualhit.previewURL}
                      alt={`${individualhit.id}`}
                    />

                    <div className="buttons">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{
                          visibility: hover === i ? "visible" : "hidden",
                          cursor: "pointer",
                        }}
                        onClick={() => openAlertFunc(individualhit)}
                        className="svgicons"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        style={{
                          visibility: hover === i ? "visible" : "hidden",
                          cursor: "pointer",
                        }}
                        fill={
                          individual.id === individualhit.id &&
                          individual.liked === true
                            ? "red"
                            : "black"
                        }
                        onClick={() => likeFunc(individualhit.id)}
                        className="svgicons"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MainDiv>
  );
};

export default Homepage;

const MainDiv = styled.div`
  font-family: Inter;

  input {
    outline: none;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .headerbuttons {
    width: 21px;
    height: 21px;
  }

  .headerbuttons:hover {
    width: 25px;
    height: 25px;
  }

  .svgicons {
    width: 18px;
    height: 18px;
  }

  .svgicons:hover {
    width: 21px;
    height: 21px;
  }
`;

const StyledSvg = styled.div`
  .svgicons {
    width: 18px;
    height: 18px;
  }

  .svgicons:hover {
    width: 21px;
    height: 21px;
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flexdirection: column;
  alignitems: center;
`;

const StyledInput = styled.input`
  font-size: 18px;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;

  :focus {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
  }

  :active {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom-style: hidden;
  }
`;
