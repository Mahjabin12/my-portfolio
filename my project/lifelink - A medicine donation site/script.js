// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Page Navigation System
    const pages = document.querySelectorAll('.page');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    // Function to show a specific page
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${pageId}`);
            
            // Update active nav link
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${pageId}`) {
                    link.classList.add('active');
                }
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
    
    // Set up navigation links
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
        });
    });
    
    // Check URL hash on page load
    function checkInitialPage() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        } else {
            // Default to home page
            showPage('home');
        }
    }
    
    // Initialize page on load
    checkInitialPage();
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        }
    });
    
    // Donate Form Validation
    const donateForm = document.getElementById('donateForm');
    if (donateForm) {
        // Set minimum date to today
        const expiryDateInput = document.getElementById('expiryDate');
        if (expiryDateInput) {
            const today = new Date().toISOString().split('T')[0];
            expiryDateInput.min = today;
            
            // Expiry date validation
            expiryDateInput.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                const today = new Date();
                const threeMonthsFromNow = new Date();
                threeMonthsFromNow.setMonth(today.getMonth() + 3);
                
                const expiryValidation = document.getElementById('expiryValidation');
                if (expiryValidation) {
                    if (selectedDate < today) {
                        expiryValidation.textContent = '❌ Medicine is expired. Cannot accept.';
                        expiryValidation.className = 'date-validation invalid';
                    } else if (selectedDate < threeMonthsFromNow) {
                        expiryValidation.textContent = '⚠️ Warning: Medicine expires within 3 months. Will be prioritized for urgent cases.';
                        expiryValidation.className = 'date-validation invalid';
                    } else {
                        expiryValidation.textContent = '✓ Medicine has sufficient shelf life for redistribution.';
                        expiryValidation.className = 'date-validation valid';
                    }
                }
            });
        }
        
        // File upload preview for medicine photo
        const medicinePhoto = document.getElementById('medicinePhoto');
        const uploadPreview = document.getElementById('uploadPreview');
        
        if (medicinePhoto && uploadPreview) {
            medicinePhoto.addEventListener('change', function(e) {
                if (this.files && this.files[0]) {
                    const fileName = this.files[0].name;
                    uploadPreview.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-file-image" style="color: var(--primary-green); font-size: 1.5rem;"></i>
                            <div>
                                <strong>${fileName}</strong>
                                <p style="font-size: 0.9rem; margin-top: 5px;">Click the upload area to change photo</p>
                            </div>
                        </div>
                    `;
                    uploadPreview.style.display = 'block';
                }
            });
        }
        
        // Form submission
        donateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const medicineName = document.getElementById('medicineName').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const batchNumber = document.getElementById('batchNumber').value;
            const condition = document.getElementById('medicineCondition').value;
            const donorName = document.getElementById('donorName').value;
            const donorEmail = document.getElementById('donorEmail').value;
            
            if (!medicineName || !expiryDate || !batchNumber || !condition || !donorName || !donorEmail) {
                alert('Please fill all required fields marked with *');
                return;
            }
            
            // Check expiry date
            const selectedDate = new Date(expiryDate);
            const today = new Date();
            if (selectedDate < today) {
                alert('Expired medicines cannot be donated for safety reasons.');
                return;
            }
            
            // Generate random tracking ID
            const trackingId = 'LL-' + new Date().getFullYear() + '-' + 
                Math.floor(1000 + Math.random() * 9000);
            
            // Show success message
            const donationSuccess = document.getElementById('donationSuccess');
            if (donationSuccess) {
                document.getElementById('trackingId').textContent = trackingId;
                donateForm.style.display = 'none';
                donationSuccess.style.display = 'block';
                
                // Scroll to success message
                setTimeout(() => {
                    donationSuccess.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            
            // Log submission (in real app, this would go to backend)
            console.log('Medicine donation submitted:', {
                medicineName,
                expiryDate,
                batchNumber,
                condition,
                donorName,
                donorEmail,
                trackingId
            });
            
            // Show notification
            showNotification('Donation request submitted successfully! Tracking ID: ' + trackingId);
        });
    }
    
    // Request Form Validation
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        // Prescription upload preview
        const prescriptionUpload = document.getElementById('prescriptionUpload');
        const prescriptionPreview = document.getElementById('prescriptionPreview');
        
        if (prescriptionUpload && prescriptionPreview) {
            prescriptionUpload.addEventListener('change', function(e) {
                if (this.files && this.files[0]) {
                    const fileName = this.files[0].name;
                    const fileType = fileName.split('.').pop().toLowerCase();
                    const icon = fileType === 'pdf' ? 'fa-file-pdf' : 'fa-file-image';
                    
                    prescriptionPreview.innerHTML = `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="fas ${icon}" style="color: var(--secondary-blue); font-size: 1.5rem;"></i>
                            <div>
                                <strong>${fileName}</strong>
                                <p style="font-size: 0.9rem; margin-top: 5px;">Prescription uploaded for verification</p>
                            </div>
                        </div>
                    `;
                    prescriptionPreview.style.display = 'block';
                }
            });
        }
        
        // Form submission
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const patientName = document.getElementById('patientName').value;
            const patientEmail = document.getElementById('patientEmail').value;
            const patientPhone = document.getElementById('patientPhone').value;
            const requestedMedicine = document.getElementById('requestedMedicine').value;
            const medicalCondition = document.getElementById('medicalCondition').value;
            
            if (!patientName || !patientEmail || !patientPhone || !requestedMedicine || !medicalCondition) {
                alert('Please fill all required fields marked with *');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(patientEmail)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Phone validation (simple)
            if (patientPhone.length < 10) {
                alert('Please enter a valid phone number');
                return;
            }
            
            // Generate random request ID
            const requestId = 'REQ-' + new Date().getFullYear() + '-' + 
                Math.floor(1000 + Math.random() * 9000);
            
            // Show success message
            const requestSuccess = document.getElementById('requestSuccess');
            if (requestSuccess) {
                document.getElementById('requestId').textContent = requestId;
                requestForm.style.display = 'none';
                requestSuccess.style.display = 'block';
                
                // Scroll to success message
                setTimeout(() => {
                    requestSuccess.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            
            // Log submission
            console.log('Medicine request submitted:', {
                patientName,
                patientEmail,
                patientPhone,
                requestedMedicine,
                medicalCondition,
                requestId
            });
            
            // Show notification
            showNotification('Medicine request submitted! Request ID: ' + requestId);
        });
    }
    
    // Delivery Tracking System
    const updateTrackingBtn = document.getElementById('updateTracking');
    if (updateTrackingBtn) {
        updateTrackingBtn.addEventListener('click', function() {
            // Simulate tracking update
            const progressFill = document.querySelector('.progress-fill');
            const currentWidth = parseInt(progressFill.style.width) || 75;
            const newWidth = Math.min(currentWidth + 5, 95);
            
            progressFill.style.width = newWidth + '%';
            
            // Update temperature (simulate small change)
            const tempValue = document.querySelector('.temp-value');
            if (tempValue) {
                const currentTemp = parseInt(tempValue.textContent);
                const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1);
                tempValue.textContent = Math.max(18, Math.min(25, newTemp)) + '°C';
            }
            
            // Update time
            const lastUpdated = document.querySelector('.estimated-delivery p:last-child');
            if (lastUpdated) {
                const now = new Date();
                lastUpdated.textContent = 'Last updated: ' + 
                    now.getHours().toString().padStart(2, '0') + ':' + 
                    now.getMinutes().toString().padStart(2, '0');
            }
            
            showNotification('Tracking updated successfully!');
        });
    }
    
    // Verification System
    const approveBtns = document.querySelectorAll('.approve-btn');
    const rejectBtns = document.querySelectorAll('.reject-btn');
    
    approveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.verification-card');
            const medicineName = card.querySelector('h3').textContent;
            
            // Update card appearance
            card.style.borderColor = '#4CAF50';
            card.style.backgroundColor = '#F1F8E9';
            
            // Disable buttons
            card.querySelectorAll('button').forEach(button => {
                button.disabled = true;
            });
            
            // Change approve button text
            this.innerHTML = '<i class="fas fa-check"></i> Approved';
            this.classList.remove('btn-success');
            this.classList.add('btn-outline');
            
            showNotification(medicineName + ' approved successfully!');
            
            // Update dashboard stats (simulated)
            updateVerificationStats();
        });
    });
    
    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.verification-card');
            const medicineName = card.querySelector('h3').textContent;
            
            // Show rejection reason prompt
            const reason = prompt('Please enter rejection reason (Safety concern, Expired, Packaging issue, etc.):');
            if (reason) {
                // Update card appearance
                card.style.borderColor = '#F44336';
                card.style.backgroundColor = '#FFEBEE';
                
                // Disable buttons
                card.querySelectorAll('button').forEach(button => {
                    button.disabled = true;
                });
                
                // Change reject button text
                this.innerHTML = '<i class="fas fa-times"></i> Rejected: ' + reason.substring(0, 15) + '...';
                this.classList.remove('btn-danger');
                this.classList.add('btn-outline');
                
                showNotification(medicineName + ' rejected. Reason: ' + reason);
                
                // Update dashboard stats (simulated)
                updateVerificationStats();
            }
        });
    });
    
    // Function to update verification stats
    function updateVerificationStats() {
        const pendingStat = document.querySelector('.stat-card:first-child .stat-number');
        const verifiedStat = document.querySelector('.stat-card:nth-child(2) .stat-number');
        
        if (pendingStat && verifiedStat) {
            let pending = parseInt(pendingStat.textContent) || 24;
            let verified = parseInt(verifiedStat.textContent) || 18;
            
            if (pending > 0) {
                pending--;
                verified++;
                
                pendingStat.textContent = pending;
                verifiedStat.textContent = verified;
                
                // Animate the update
                pendingStat.style.transform = 'scale(1.2)';
                verifiedStat.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    pendingStat.style.transform = 'scale(1)';
                    verifiedStat.style.transform = 'scale(1)';
                }, 300);
            }
        }
    }
    
    // Notification System
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--primary-green);
            color: white;
            padding: 15px 20px;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Add CSS for animation if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Auto-check expiry dates on donate form when page loads
    if (expiryDateInput && expiryDateInput.value) {
        expiryDateInput.dispatchEvent(new Event('change'));
    }
});