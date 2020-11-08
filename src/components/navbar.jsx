import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav id="menu" class="navbar main-menu">
      <div class="nav-inner">
        <div class="navbar-header">
          <span id="category" class="visible-xs">
            Categories
          </span>
          <button type="button" class="btn btn-navbar navbar-toggle">
            <i class="fa fa-bars"></i>
          </button>
        </div>
        <div class="navbar-collapse">
          <ul class="main-navigation">
            <li class="home_first">
              <Link
                href="http://html.lionode.com/moonstore/ms01/index.html"
                class="parent"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="http://html.lionode.com/moonstore/ms01/category.html"
                class="parent"
              >
                Collection
              </Link>
            </li>
            <li>
              <Link
                href="http://html.lionode.com/moonstore/ms01/category.html"
                class="parent"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="http://html.lionode.com/moonstore/ms01/category.html"
                class="parent"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="http://html.lionode.com/moonstore/ms01/index.html#"
                class="active parent"
              >
                Page
              </Link>
              <ul>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/category.html">
                    Category Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/cart.html">
                    Cart Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/checkout.html">
                    Checkout Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/blog.html">
                    Blog Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/single-blog.html">
                    Singale Blog Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/register.html">
                    Register Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/contact.html">
                    Contact Page
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/affiliate.html">
                    Affiliate
                  </Link>
                </li>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/forgetpassword.html">
                    Forget Password
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="http://html.lionode.com/moonstore/ms01/blog.html"
                class="parent"
              >
                Blog
              </Link>
            </li>
            <li class="level-top hiden_menu menu-last">
              <Link
                href="http://html.lionode.com/moonstore/ms01/index.html#"
                class="level-top"
              >
                More
              </Link>
              <span class="active_menu"></span>
              <ul>
                <li>
                  <Link href="http://html.lionode.com/moonstore/ms01/about-us.html">
                    About us
                  </Link>
                </li>
                <li class="last-menu">
                  <Link href="http://html.lionode.com/moonstore/ms01/contact.html">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

