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

