trait Validator[T] {
  def validate(t: T): Option[ApiError]
}
//Pendiente cuando se cambie los datos
object CreateClientValidator extends Validator[CreateClient] {
  def validate(createClient: CreateClient): Option[ApiError] =
    if (createClient.name.isEmpty)
      Some(ApiError.emptyNameField)
    else
      None
}

object UpdateClientValidator extends Validator[UpdateClient] {
  def validate(updateClient: UpdateClient): Option[ApiError] =
    if (updateClient.cc.isEmpty)
      Some(ApiError.emptyCcField)
    else
      None
}