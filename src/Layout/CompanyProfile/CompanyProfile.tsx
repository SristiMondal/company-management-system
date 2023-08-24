import React, { useEffect, useState } from "react";
import { Box, Typography, Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CompanyProfile.css";
import { RootState } from "../../redux/store";
import { fetchCompanyData } from "../../utils/data";
import { getCompanyList } from "../../redux/Dashboard/dashboardSlice";

const title = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#141518",
  letterSpacing: 0.2,
  lineHeight: "30px",
};

const description = {
  fontSize: "14px",
  color: "#141518",
  letterSpacing: 0.2,
  lineHeight: "30px",
  marginLeft: "5px",
};

const CompanyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const companies = useSelector(
    (state: RootState) => state.company.companyList
  );
  const [profileData, setProfileData] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const companiesData: any = await fetchCompanyData();
      if (companiesData) {
        dispatch(getCompanyList(companiesData.data));
      }
      setLoader(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (companies) {
      let filteredData = companies?.filter((row: any) => row.id == 1);
      setProfileData(filteredData.length ? filteredData[0] : []);
    }
  }, [companies]);

  return (
    <Box>
      {loader ? (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={loader}
          onClick={() => {
            console.log("Hi");
          }}
          data-testid="loading-spinner"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Box className="outerBox">
          <Box className="innerBox">
            <Box className="imageOuterBox">
              <img
                src={"https://picsum.photos/200/300"}
                alt="profile"
                className="image"
              />
            </Box>
            <Box className="detailsMainBox">
              <Box className="dataOuterBox">
                <Typography variant="body1" color="initial" sx={title}>
                  Company Name:
                </Typography>
                <Typography variant="body1" color="initial" sx={description}>
                  {profileData?.name ?? ""}
                </Typography>
              </Box>
              <Box className="dataOuterBox">
                <Typography variant="body1" color="initial" sx={title}>
                  Owner:
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={description}
                >{`${profileData?.contact?.firstname ?? ""} ${
                  profileData?.contact?.lastname ?? ""
                }`}</Typography>
              </Box>
              <Box className="dataOuterBox">
                <Typography variant="body1" color="initial" sx={title}>
                  Website Link:
                </Typography>
                <Typography variant="body1" color="initial" sx={description}>
                  {profileData?.website ?? ""}
                </Typography>
              </Box>
              <Box className="dataOuterBox">
                <Typography variant="body1" color="initial" sx={title}>
                  Contact:
                </Typography>
                <Typography
                  variant="body1"
                  color="initial"
                  sx={description}
                  data-testid="test-phone"
                >
                  {profileData?.phone ?? ""}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CompanyProfile;
