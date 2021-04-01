import emailjs from 'emailjs-com'

const Message = () => {
    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('gmail', 'user_2GksWNIL5FeHmonpo2gn4', e.target, 'user_2GksWNIL5FeHmonpo2gn4')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return (
        <div>
            <form className="contact-form" onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
            </form>
                <a href='/'> Go Back to Search</a>
        </div>
        
  )
}

export default Message