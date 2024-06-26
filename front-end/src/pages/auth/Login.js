//React
import React, { useEffect, useState } from "react";
import styles from "@/styles/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

//Componentes
import ButtonInfo from "@/Componentes/ButtonInfo/ButtonInfo";
import Message from "@/Componentes/Message/message";

//Slice
import { login, reset } from "@/slice/authSlice";
import { getUserDetails } from "@/slice/userSlice";
import Link from "next/link";

export const Login = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  if (!user.length == undefined) {
    router.push("/PageNotes");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };
    const resultAction = await dispatch(login(loginUser));

    if (login.fulfilled.match(resultAction)) {
      router.push("/PageNotes");
    } else {
      console.error("Login failed:", resultAction.error.message);
    }
  };
  //Clean all auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <html>
      <body className={styles.Background}>
        <div>
          <div className={styles.logoNotes}>
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.logoNotes}
            >
              <rect width="42" height="42" rx="5" fill="#E4C5C4" />
              <path
                d="M28.46 37H22.646L12.922 22.278V37H7.108V13.132H12.922L22.646 27.922V13.132H28.46V37Z"
                fill="#6F7357"
              />
              <path
                d="M34.8844 13.132V17.79H28.5604V37H22.7464V17.79H16.4224V13.132H34.8844Z"
                fill="#C8AD8D"
              />
            </svg>
          </div>
          <div className={styles.loginGeral}>
            <div className={styles.infosLogin}>
              <h2>Welcome back!</h2>
              <ButtonInfo
                info="Entre com o google"
                src="https://cdn.iconscout.com/icon/free/png-512/free-google-160-189824.png?f=webp&w=256"
                alt="Icone do google"
              />
              <div className={styles.or}>
                <span className={styles.line}></span>
                <h3>or</h3>
                <span className={styles.line}></span>
              </div>
              <form className={styles.infosLogin} onSubmit={handleSubmit}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  info=""
                  id=""
                  className={styles.inputTextLogin}
                  placeholder="Seu email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  info=""
                  id=""
                  className={styles.inputTextLogin}
                  placeholder="Sua senha"
                />

                <Link href={"auth/Register"} className={styles.register}>
                  <h3>Registre-se</h3>
                </Link>

                {!loading && (
                  <input type="submit" className={styles.loginButton}></input>
                )}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error[0]} type="error" />}
              </form>
            </div>
            <div className={styles.imgLogin}>
              <svg
                width="569"
                height="618"
                viewBox="0 0 569 618"
                fill="none"
                className={styles.imgLoginSvg}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M330.66 68.2279C339.221 58.1812 345.015 45.8687 344.047 32.0723C341.257 -7.6791 285.91 1.0657 275.144 21.1288C264.378 41.1919 265.657 92.0835 279.572 95.6694C285.121 97.0994 296.942 93.5964 308.973 86.3463L301.421 139.76H346.01L330.66 68.2279Z"
                  fill="#B28B67"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M316.786 46.638C318.244 45.6361 319.986 45.0275 321.858 45.0275C326.988 45.0275 331.147 49.6015 331.147 54.315C331.147 59.2186 328.831 63.01 325.524 64.6185C327.29 68.0715 329.067 70.5774 331.147 71.0325C339.177 70.2204 349.726 50.2666 349.726 33.8825C349.726 15.9493 335.454 0.44751 308.853 0.44751C284.943 0.44751 275.878 10.3038 275.41 19.0225C285.656 21.8377 303.559 22.9218 329.289 22.7375V24.595L306.995 26.4525L303.279 37.5975C309.191 37.1563 313.415 41.2103 316.786 46.638Z"
                  fill="#191847"
                />
                <path
                  d="M364.589 617.138C285.581 617.138 221.532 556.013 221.532 480.611C221.532 405.21 285.581 344.085 364.589 344.085C443.598 344.085 507.647 405.21 507.647 480.611C507.647 556.013 443.598 617.138 364.589 617.138Z"
                  fill="#C5CFD6"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M94.2486 596.073C118.053 543.398 135.269 497.53 142.179 473.33C154.011 431.894 163.012 395.432 165.287 381.816C170.712 349.346 123.555 347.455 117.322 363.592C107.888 388.016 91.4178 468.264 71.6281 589.475L94.2486 596.073ZM370.371 430.763C348.53 422.131 272.044 395.12 235.155 387.478C224.555 385.283 214.28 383.243 204.621 381.399C175.909 375.919 161.034 427.705 188.687 431.684C257.553 441.593 355.183 451.826 363.538 452.974C375.248 454.584 384.097 436.187 370.371 430.763Z"
                  fill="#B28B67"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M186.999 367.148L305.137 307.022V293.933H291.087C176.794 323.05 118.39 341.711 115.876 349.914C115.849 350.002 115.824 350.09 115.801 350.179C115.744 350.254 115.687 350.33 115.632 350.406C92.981 381.551 79.4157 533.6 74.9633 544.985L118.367 551.459C134.97 489.905 188.089 447.024 186.678 373.302C187.059 371.139 187.156 369.088 186.999 367.148Z"
                  fill="#1F28CF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M295.321 402.857C306.131 400.694 316.085 398.763 324.603 397.269C379.621 387.621 395.665 358.176 386.179 293.933H284.808C268.249 298.688 182.192 334.769 137.542 353.96C107.991 366.662 117.306 412.449 134.042 424.365C134.132 425.096 134.434 425.593 134.97 425.815C224.993 463.119 296.21 443.545 320 449.799L331.004 415.094L295.321 402.857Z"
                  fill="#2B44FF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M362.905 425.246C368.803 425.809 372.989 426.695 375.465 427.902C378.476 429.37 382.625 432.014 387.912 435.834C386.209 439.327 370.896 470.715 341.974 529.999C332.689 528.501 329.01 524.959 330.937 519.372C332.864 513.785 334.418 509.122 335.6 505.381L337.438 452.099C337.473 451.073 338.333 450.271 339.358 450.306C339.376 450.307 339.394 450.308 339.411 450.309L347.609 450.823C352.267 447.053 355.341 443.643 356.829 440.591C358.039 438.112 358.708 434.2 358.836 428.855C358.885 426.804 360.588 425.181 362.64 425.23C362.728 425.232 362.817 425.237 362.905 425.246Z"
                  fill="#E4E4E4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M105.082 586.307C107.161 591.854 108.2 596.005 108.2 598.759C108.2 602.108 107.642 606.996 106.526 613.423C102.639 613.423 67.7094 613.423 1.73694 613.423C-0.986153 604.422 0.58577 599.563 6.4527 598.845C12.3196 598.128 17.1934 597.48 21.074 596.901L69.7787 575.193C70.7159 574.775 71.8143 575.196 72.2321 576.133C72.2393 576.149 72.2462 576.165 72.2529 576.182L75.3836 583.774C80.8148 586.308 85.2283 587.575 88.6239 587.575C91.3828 587.575 95.1929 586.461 100.054 584.233C101.92 583.378 104.125 584.197 104.98 586.062C105.017 586.142 105.051 586.224 105.082 586.307Z"
                  fill="#E4E4E4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M193.868 257.027L134.605 300.536C118.531 304.872 105.102 310.267 94.318 316.721C91.7706 319.042 88.6918 323.742 99.2566 322.93C109.821 322.118 120.971 321.738 122.428 325.341C123.886 328.944 117.493 333.252 120.44 338.113C122.404 341.354 131.685 333.228 148.283 313.735L206.969 289.405L193.868 257.027ZM462.056 238.904L429.336 244.827C467.312 320.169 487.651 360.005 490.355 364.336C496.439 374.08 490.298 391.635 487.981 400.896C501.444 404.279 496.468 383.839 513.5 388.386C529.047 392.536 542.112 402.718 556.906 389.551C558.725 387.933 560.125 382.798 554.068 380.046C538.978 373.19 516.73 360.458 513.171 355.604C508.317 348.983 491.279 310.084 462.056 238.904Z"
                  fill="#B28B67"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M180.063 261.757C172.438 261.209 164.143 262.472 155.251 265.468C150.875 266.942 148.523 271.683 149.998 276.058C150.854 278.599 152.813 280.457 155.162 281.28C153.46 282.521 151.743 283.755 150.012 284.982L164.962 315.497C227.876 284.135 287.009 260.49 313.955 208.713C322.998 191.336 319.937 132.308 320.8 110.834L300.93 102.687C273.232 159.929 235.746 214.846 180.063 261.757Z"
                  fill="#E4C5C4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M390.6 310.482C332.191 316.898 286.216 316.898 252.677 310.482C248.522 309.688 248.704 291.779 250.631 286.887C280.64 210.72 300.38 154.962 300.38 102.058C305.886 104.933 315.523 105.364 329.289 103.351C366.287 157.87 383.294 220.425 390.6 310.482Z"
                  fill="#191847"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M401.453 319.488C403.436 317.622 404.47 314.824 403.962 311.942L402.994 306.455C402.338 302.736 399.317 300.028 395.75 299.604C395.127 296.817 394.589 294.049 394.145 291.301C390.395 268.09 396.803 245.33 396.502 222.98C426.377 248.464 453.177 292.467 476.903 354.991L511.993 344.667C510.654 339.694 509.267 334.782 507.832 329.932C511.882 327.631 516.615 317.088 513.209 315.324C509.691 313.502 505.965 312.219 502.04 311.464C469.866 214.579 417.252 143.722 344.198 98.895H337.735L323.068 98.895C329.289 181.146 243.362 360.719 273.198 514.08C328.346 526.393 407.076 488.084 483.712 518.69C480.861 456.93 423.739 384.376 401.453 319.488Z"
                  fill="#E4C5C4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M336.525 100.753L346.11 130.223L326.807 152.315L344.252 169.676L302.049 241.923L353.658 169.82L336.525 152.315L353.658 132.792L336.525 100.753Z"
                  fill="black"
                  fill-opacity="0.1"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M314.426 269.785C318.531 269.785 321.858 266.458 321.858 262.355C321.858 258.252 318.531 254.925 314.426 254.925C310.322 254.925 306.995 258.252 306.995 262.355C306.995 266.458 310.322 269.785 314.426 269.785ZM305.137 312.508C309.241 312.508 312.568 309.181 312.568 305.078C312.568 300.974 309.241 297.648 305.137 297.648C301.032 297.648 297.705 300.974 297.705 305.078C297.705 309.181 301.032 312.508 305.137 312.508ZM303.279 355.23C307.383 355.23 310.71 351.903 310.71 347.8C310.71 343.697 307.383 340.37 303.279 340.37C299.175 340.37 295.847 343.697 295.847 347.8C295.847 351.903 299.175 355.23 303.279 355.23Z"
                  fill="black"
                  fill-opacity="0.4"
                />
              </svg>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
