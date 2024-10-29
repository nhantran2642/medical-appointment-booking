from api import settings
from authentication.models import User, UserVerifyCode
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string


def send_mail(subject, template, emails, merge_data={}):
    html_body = render_to_string(template, merge_data)

    msg = EmailMultiAlternatives(
        subject=subject, from_email=settings.ADMIN_EMAIL, to=emails, body=""
    )
    msg.attach_alternative(html_body, "text/html")
    msg.send()


def send_verify_email(user: User, url):
    merge_data = {"full_name": user.get_full_name(), "url": url}
    subject = "Chào mừng đến với chúng tôi"
    send_mail(subject, "emails/templates/verify_sign_up.html", [user.email], merge_data)
    return True


def send_verify_login(user: User, verify_code: UserVerifyCode):
    subject = "Xác thực 2FA"
    merge_data = {
        "code": verify_code["code"],
        "full_name": user.get_full_name(),
        "expire_time": settings.TOKEN_EXPIRE,
    }
    send_mail(
        subject, "emails/templates/send_code_login.html", [user.email], merge_data
    )
    return True


def send_password_reset_email(user, current_site, relative_link):
    subject = "Làm mới mật khẩu"
    link = "http://" + current_site + relative_link
    print(link)
    merge_data = {
        "link": link,
        "fullname": user.get_full_name(),
    }
    send_mail(
        subject,
        "emails/templates/password_reset_confirm.html",
        [user.email],
        merge_data,
    )
    return True
