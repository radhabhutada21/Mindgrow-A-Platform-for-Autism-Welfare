
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';


const HomePage = () => {
  

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // this should match the route path you defined
  };
  


  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <div className="logo-container">
              <img className="logo-icon" src={require('../media/photos/navbarlogo.jpg')} alt="MindGrow Logo" />
            </div>
            <h1>MindGrow</h1>
          </div>
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your Digital Health Companion</h1>
          <p>A comprehensive autism support and healthcare management solution designed to enhance patient care and streamline medical practice efficiency.</p>
          <div className="login-buttons">
            <button className="btn btn-primary" onClick={handleRegisterClick}>Register on Platform</button>
            
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder for hero image */}
        </div>
      </section>

      

      {/* Rest of your HomePage code remains the same */}
      
      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-header">
          <h2>About MindGrow</h2>
        </div>
        <div className="section-content">
          <div className="about-text">
            <p>MindGrow is a specialized digital platform designed to support children with autism and their families. Our comprehensive healthcare management solution connects parents, doctors, and therapists to provide holistic care and track progress effectively.</p>
            <p>We believe in empowering families with personalized progress tracking, expert parenting resources, and seamless doctor consultations—all in one secure place.</p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Children Supported</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Medical Professionals</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Key Features</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon child-profile"></div>
            <h3>Child Profile</h3>
            <p>Create detailed profiles with medical history, treatment plans, and personal preferences.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon progress-tracking"></div>
            <h3>Progress Tracking</h3>
            <p>Monitor development milestones and therapy outcomes with visual analytics.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon doctor-connect"></div>
            <h3>Doctor Consultations</h3>
            <p>Connect with specialists for virtual appointments and follow-ups.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon resources"></div>
            <h3>Parenting Resources</h3>
            <p>Access expert articles and personalized recommendations for your child's needs.</p>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <h2>What Parents & Doctors Say</h2>
        </div>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p>"MindGrow has transformed how I track my child's development. The progress charts make it easy to see improvements over time."</p>
            <div className="testimonial-author">- Parent of a 7-year-old</div>
          </div>
          <div className="testimonial-card">
            <p>"As a pediatric specialist, I can now efficiently monitor all my patients' progress and provide more informed guidance during consultations."</p>
            <div className="testimonial-author">- Dr. S. Patel, Pediatric Neurologist</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Start your journey with MindGrow today</h2>
        <p>Join thousands of families and healthcare providers who trust MindGrow for autism care management.</p>
        <div className="cta-buttons">
          <button className="btn btn-large" >Get Started</button>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>MindGrow</h3>
            <p>Guiding Your Child's Progress, Every Step of the Way</p>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Our Team</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#articles">Articles</a></li>
                <li><a href="#research">Research</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
            <div className="link-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#data">Data Protection</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MindGrow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;