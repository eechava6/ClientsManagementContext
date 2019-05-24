case class Client(id: String, name: String, cc: String)
case class CreateClient(name: String, cc: String)
case class UpdateClient(cc: Option[String], name: Option[String])
