# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_24_044612) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "code_alerts", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "severity"
    t.string "status"
    t.bigint "repository_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "dependabot_alerts", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "severity"
    t.string "status"
    t.bigint "repository_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "node_id"
    t.index ["repository_id"], name: "index_dependabot_alerts_on_repository_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.string "avatar_url"
    t.boolean "two_factor_requirement_enabled"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "repositories", force: :cascade do |t|
    t.string "name"
    t.bigint "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["organization_id"], name: "index_repositories_on_organization_id"
  end

  create_table "user_org_tables", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "organization_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["organization_id"], name: "index_user_org_tables_on_organization_id"
    t.index ["user_id"], name: "index_user_org_tables_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "access_token"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "login"
  end

  add_foreign_key "dependabot_alerts", "repositories"
end
