import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { ROUTES } from "../constants/routes";

const Header = ({ userName = "Kiran Shetty" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (route) => {
    handleMenuClose();
    if (route) navigate(route);
  };

  return (
    <header className="w-full p-4 flex justify-between items-center border-b border-gray-100 bg-white">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">TicTacToe</span>
      </div>
      <div>
        <IconButton
          aria-label="menu"
          aria-controls={open ? "app-menu" : undefined}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="app-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            className:
              "rounded-xl border border-gray-100 shadow-lg bg-white p-0 min-w-[200px]",
            style: {
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
            },
          }}
        >
          <div className="px-4 py-3 flex items-center gap-2 border-b border-gray-100">
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              className="text-gray-900"
            >
              {userName}
            </Typography>
          </div>
          <div className="px-4 pb-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <Typography variant="caption" color="text.secondary">
              Online
            </Typography>
          </div>
          <hr
            style={{
              margin: 0,
              border: 0,
              borderTop: "1px solid #f3f4f6",
            }}
          />
          <MenuItem
            onClick={() => handleMenuAction(ROUTES.PROFILE)}
            className="hover:bg-gray-50 text-gray-800"
          >
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(ROUTES.FRIENDS)}
            className="hover:bg-gray-50 text-gray-800"
          >
            Friends & Invitations
          </MenuItem>
          <MenuItem
            onClick={() => handleMenuAction(ROUTES.LEADERBOARD)}
            className="hover:bg-gray-50 text-gray-800"
          >
            Leaderboard
          </MenuItem>
          <hr
            style={{
              margin: 0,
              border: 0,
              borderTop: "1px solid #f3f4f6",
            }}
          />
          <MenuItem
            onClick={() => handleMenuAction(ROUTES.LANDING)}
            className="hover:bg-red-50 text-red-600 font-semibold"
            sx={{ color: "#dc2626", fontWeight: "bold" }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
