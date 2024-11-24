FULL_DAY_FORMAT = "%Y-%m-%d %H:%M:%S"

DAY_FORMAT = "%Y%m%d"

DAY_EXCEL_FORMAT = "%Y/%m/%d"

USER_ROLE = {
    "ADMIN": 1,
    "DOCTOR": 2,
    "STAFF": 3,
    "USER": 4,
}

REGEX_CHECK_FORMAT_PASSWORD = (
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
)
