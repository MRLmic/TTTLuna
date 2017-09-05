API="${API_ORIGIN:-http://tic-tac-toe.wdibos.com/games"
URL_PATH="/games/{ID}"
# API="${API_ORIGIN:-https://aqueous-atoll-85096.herokuapp.com/"
# URL_PATH="/sign-in"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \

echo
