import base64
from datetime import datetime, timezone, timedelta
import json


def encode_appointment_data(user_id, doctor_id, appointment_datetime):
    current_time = datetime.now().isoformat()
    data = {
        "user_id": user_id,
        "doctor_id": doctor_id,
        "appointment_datetime": appointment_datetime,
        "current_time": current_time,
    }
    json_data = json.dumps(data)
    encoded_data = base64.urlsafe_b64encode(json_data.encode()).decode()
    return encoded_data


def decode_appointment_data(encoded_data):
    json_data = base64.urlsafe_b64decode(encoded_data.encode()).decode()
    data = json.loads(json_data)
    return data

