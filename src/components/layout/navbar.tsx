import Link from "next/link";
import Image from "next/image";
import {
  IconCaretDown,
  IconSearch,
  IconUserSquare,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useProfile, useLogout } from "@/hooks/auths/useAuth";
import { useAuthStatus } from "@/hooks/auths/useAuthStatus";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// Add navigation and auth link data at the top
const NAV_LINKS = [
  { title: "หน้าหลัก", href: "/", disabled: true },
  { title: "Dashboard", href: "/", disabled: true },
  { title: "ระบบสุขภาวะ (WHP)", href: "/whp/list" },
];

const AUTH_LINKS = [{ title: "รายชื่อผู้ใช้งาน", href: "/user/list" }];

// const LANGUAGES = [
//   { code: "TH", name: "ไทย", flag: "/backoffice/images/th-flag.png", isActive: true },
//   { code: "EN", name: "English", flag: "/backoffice/images/en-flag.png", isActive: false },
// ];

// Font size options
const FONT_SIZES = [
  { size: 16, label: "A", className: "text-sm" },
  { size: 18, label: "A", className: "text-md" },
  { size: 20, label: "A", className: "text-lg" },
];

// Pages where login button should be visible
const LOGIN_BUTTON_PAGES = [
  "/reset-password",
  "/forgot-password",
  "/news",
  "/register",
];

// Custom hook for dropdown with timeout
function useDropdownWithTimeout(timeout = 100) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => setIsOpen(false), timeout);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return { isOpen, handleMouseEnter, handleMouseLeave };
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const authDropdown = useDropdownWithTimeout(100);
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auth hooks
  const { data: profile } = useProfile();
  const { isAuthenticated } = useAuthStatus();
  const logoutMutation = useLogout();

  const isActiveLink = (href: string) => pathname === href;

  // Handle mobile menu toggle with animation
  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      // Start closing animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 300); // Match animation duration
    } else {
      // Start opening animation
      setIsMobileMenuOpen(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 50); // Small delay to ensure DOM update
    }
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  }, [isMobileMenuOpen]);

  // Handle logout
  const handleLogout = async () => {
    try {
      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          router.push("/login");
          closeMobileMenu();
        },
        onError: () => {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถออกจากระบบได้",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle font size change
  const handleFontSizeChange = (size: number) => {
    setCurrentFontSize(size);
    if (typeof document !== "undefined") {
      document.documentElement.style.fontSize = `${size}px`;
      localStorage.setItem("websiteFontSize", size.toString());
    }
  };

  // Initialize font size on component mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const savedFontSize = localStorage.getItem("websiteFontSize");
      const fontSize = savedFontSize ? parseInt(savedFontSize) : 16;
      setCurrentFontSize(fontSize);
      document.documentElement.style.fontSize = `${fontSize}px`;
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-transparent relative">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-26">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <Image
                src="/backoffice/images/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="w-12 h-auto lg:w-18"
              />
            </Link>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex flex-col items-end justify-center h-full space-y-4">
            <div className="flex items-center space-x-4 gap-2">
              {/* Search */}
              <IconSearch className="w-5 h-5 cursor-pointer hover:text-highlight" />

              {/* Font size */}
              <div className="flex items-baseline gap-2 font-bold h-auto">
                {FONT_SIZES.map((fontOption, index) => (
                  <div
                    key={index}
                    className={`${
                      fontOption.className
                    } cursor-pointer transition-colors ${
                      currentFontSize === fontOption.size
                        ? "text-highlight"
                        : "hover:text-highlight"
                    }`}
                    onClick={() => handleFontSizeChange(fontOption.size)}
                  >
                    {fontOption.label}
                  </div>
                ))}
              </div>

              {/* Desktop Login Buttons */}
              {LOGIN_BUTTON_PAGES.includes(pathname || "") &&
                !isAuthenticated && (
                  <div className="flex items-center gap-3">
                    <div className="border-2 border-highlight rounded-xl px-5 py-1 hover:bg-highlight hover:text-white transition-colors duration-300">
                      <Link href="/login">เข้าสู่ระบบ</Link>
                    </div>
                    <div className="border-2 border-secondary text-white bg-secondary rounded-xl px-5 py-1 hover:bg-transparent hover:text-secondary transition-colors duration-300">
                      <Link href="/register">สมัครสมาชิก</Link>
                    </div>
                  </div>
                )}
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center justify-end space-x-8 font-bold text-md">
              <div className="flex items-center space-x-8">
                {NAV_LINKS.map((link) =>
                  link.disabled ? (
                    <span
                      key={link.href}
                      className="px-3 py-2 rounded-md font-medium text-gray-400 cursor-not-allowed"
                    >
                      {link.title}
                    </span>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-2 rounded-md font-medium transition-colors ${
                        isActiveLink(link.href)
                          ? "text-highlight underline underline-offset-10 decoration-6"
                          : "text-gray-700 hover:text-highlight hover:underline hover:underline-offset-10 hover:decoration-6"
                      }`}
                    >
                      {link.title}
                    </Link>
                  )
                )}
              </div>

              {/* Desktop Auth Dropdown */}
              {isAuthenticated && (
                <div
                  className="flex items-center relative"
                  onMouseEnter={authDropdown.handleMouseEnter}
                  onMouseLeave={authDropdown.handleMouseLeave}
                >
                  <span className="flex items-center cursor-pointer text-gray-700 rounded-md font-medium">
                    <IconUserSquare className="w-5 h-5 mr-1" />
                    <span className="hidden xl:inline">
                      {profile?.username || "ผู้ใช้งาน"}
                    </span>
                    <IconCaretDown className="w-4 h-4 ml-1" />
                  </span>
                  <div
                    className={`absolute top-0 left-0 mt-10 w-48 bg-white rounded-md shadow-lg transition-opacity duration-200 z-50 ${
                      authDropdown.isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    {profile?.role === "supervisor" &&
                      AUTH_LINKS.map((link, i) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-2 transition-colors ${
                            isActiveLink(link.href)
                              ? "text-highlight bg-gray-100"
                              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                          } ${i === 0 ? "rounded-t-md" : ""}`}
                        >
                          {link.title}
                        </Link>
                      ))}
                    <button
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                      className={`w-full text-left px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors ${
                        profile?.role === "supervisor"
                          ? "rounded-b-md"
                          : "rounded-md"
                      } flex items-center gap-2`}
                    >
                      <IconLogout className="w-4 h-4" />
                      {logoutMutation.isPending
                        ? "กำลังออกจากระบบ..."
                        : "ออกจากระบบ"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Mobile Font Size */}
            <div className="flex items-baseline gap-1 font-bold">
              {FONT_SIZES.map((fontOption, index) => (
                <div
                  key={index}
                  className={`${
                    fontOption.className
                  } cursor-pointer transition-colors ${
                    currentFontSize === fontOption.size
                      ? "text-highlight"
                      : "hover:text-highlight"
                  }`}
                  onClick={() => handleFontSizeChange(fontOption.size)}
                >
                  {fontOption.label}
                </div>
              ))}
            </div>

            {/* Mobile Search */}
            {/* <IconSearch className="w-5 h-5 cursor-pointer hover:text-highlight" /> */}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button p-2 rounded-md text-gray-700 hover:text-highlight focus:outline-none focus:ring-2 focus:ring-highlight transition-all duration-200"
              aria-label="เปิดเมนู"
            >
              <div className="relative w-6 h-6">
                <IconMenu2
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
                <IconX
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {(isMobileMenuOpen || isAnimating) && (
        <div
          className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-out ${
            isMobileMenuOpen && !isAnimating
              ? "bg-black/50 backdrop-blur-sm"
              : "bg-black/0 backdrop-blur-none"
          }`}
          onClick={closeMobileMenu}
        >
          <div
            className={`mobile-menu fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-all duration-300 ease-out ${
              isMobileMenuOpen && !isAnimating
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/backoffice/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    className="w-10 h-auto"
                  />
                  {/* <span className="font-semibold text-gray-800">เมนู</span> */}
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-gray-700 hover:text-highlight hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                  aria-label="ปิดเมนู"
                >
                  <IconX className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Navigation Links */}
                <div className="px-4 py-6 space-y-1">
                  <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    หน้าหลัก
                  </h3>
                  {NAV_LINKS.map((link, index) =>
                    link.disabled ? (
                      <span
                        key={link.href}
                        className="block px-4 py-4 rounded-lg font-medium text-gray-400 cursor-not-allowed"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {link.title}
                      </span>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                          isActiveLink(link.href)
                            ? "text-highlight bg-highlight/10 border-r-4 border-highlight shadow-sm"
                            : "text-gray-700 hover:text-highlight hover:bg-gray-50 hover:shadow-sm"
                        }`}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {link.title}
                      </Link>
                    )
                  )}
                </div>

                {/* Auth Section */}
                {isAuthenticated ? (
                  <div className="border-t bg-gray-50/50">
                    <div className="px-4 py-4">
                      <div className="flex items-center mb-4 p-3 bg-white rounded-lg shadow-sm border">
                        <div className="w-10 h-10 bg-highlight/10 rounded-full flex items-center justify-center mr-3">
                          <IconUserSquare className="w-5 h-5 text-highlight" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 block">
                            {profile?.username || "ผู้ใช้งาน"}
                          </span>
                          <span className="text-sm text-gray-500">
                            ผู้ใช้งานระบบ
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {profile?.role === "supervisor" && (
                          <>
                            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                              จัดการระบบ
                            </h3>
                            {AUTH_LINKS.map((link, index) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className={`block px-4 py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                                  isActiveLink(link.href)
                                    ? "text-highlight bg-highlight/10 border-r-4 border-highlight shadow-sm"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-sm"
                                }`}
                                style={{
                                  animationDelay: `${
                                    (NAV_LINKS.length + index) * 50
                                  }ms`,
                                }}
                              >
                                {link.title}
                              </Link>
                            ))}
                          </>
                        )}
                        <button
                          onClick={handleLogout}
                          disabled={logoutMutation.isPending}
                          className="w-full text-left px-4 py-4 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 rounded-lg flex items-center gap-3 transform hover:scale-[1.02] hover:shadow-sm"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <IconLogout className="w-4 h-4" />
                          </div>
                          <span>
                            {logoutMutation.isPending
                              ? "กำลังออกจากระบบ..."
                              : "ออกจากระบบ"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  LOGIN_BUTTON_PAGES.includes(pathname || "") && (
                    <div className="border-t px-4 py-6 space-y-3 bg-gray-50/50">
                      <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        เข้าสู่ระบบ
                      </h3>
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="block w-full text-center border-2 border-highlight rounded-xl px-5 py-4 hover:bg-highlight hover:text-white transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-sm"
                      >
                        เข้าสู่ระบบ
                      </Link>
                      <Link
                        href="/register"
                        onClick={closeMobileMenu}
                        className="block w-full text-center border-2 border-secondary text-white bg-secondary rounded-xl px-5 py-4 hover:bg-transparent hover:text-secondary transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-sm"
                      >
                        สมัครสมาชิก
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
