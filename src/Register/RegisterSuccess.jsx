import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";

function RegisterSuccess() {
  return (
    <div class="container d-flex align-items-center justify-content-center text-center h-100">
      <div class="text-white">
        <div className="home">
          <div className="registerSuccessTitle mb-3">
            Successfully Registered
          </div>
          <p class="homeTitleSm mb-4">Login to your account..</p>
          <div class="text-center">
            <Link to="/login">
              <button
                type="button"
                className="btn btn-primary btn-lg registerSuccessLoginButton"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
